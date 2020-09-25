pragma solidity ^0.6.7;

interface AggregatorV3Interface {

  function decimals() external view returns (uint8);
  function description() external view returns (string memory);
  function version() external view returns (uint256);

  // getRoundData and latestRoundData should both raise "No data present"
  // if they do not have data to report, instead of returning unset values
  // which could be misinterpreted as actual reported values.
  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );

}

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x777A68032a88E5A84678A77Af2CD65A7b3c0775a);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return price;
    }
}

contract Derivative {

    uint256 numberDurationExpiration = 10;
    uint8 public countOfPrices = 0;
    uint256 latestPrice;
    address public owner;

    struct InfoDerivative {
      bytes32 hashIssue;
      uint256 startExpirationBlock;
      uint256 endExpirationBlock;
      int256[] pricesExpiration;
      int256 averagePrice;
      bool isActive;
      bool isExpirate;
    }

    event CreateFutures(bytes32 hashIssue, uint256 startExpirationBlock,  int256[] pricesExpiration, bool isActive, bool isExpirate);
    mapping(bytes32 => InfoDerivative) public poolDerivatives;
    modifier  onlyOwner  {
        require(msg.sender == owner, "Sender is not the owner");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function createDerivative(uint256 startExpirationBlockNumber) public onlyOwner returns(bytes32){
      int256[] memory prices = new int256[](numberDurationExpiration);
      prices[0] = 0;
      bytes32 hashDerivative = keccak256(abi.encode(block.timestamp, block.difficulty));
      InfoDerivative memory newFuture = InfoDerivative( {
          hashIssue: hashDerivative,
          startExpirationBlock: startExpirationBlockNumber,
          endExpirationBlock: startExpirationBlockNumber + numberDurationExpiration,
          pricesExpiration: prices,
          averagePrice: 0,
          isActive: true,
          isExpirate: false
        });
        poolDerivatives[hashDerivative] = newFuture;
        emit CreateFutures(newFuture.hashIssue, newFuture.startExpirationBlock, newFuture.pricesExpiration, newFuture.isActive, newFuture.isExpirate);
        return newFuture.hashIssue;

    }

    function setExpirationPrice(int256 price, bytes32 hashDerivative) public onlyOwner {
      InfoDerivative memory currentDerivative = poolDerivatives[hashDerivative];
      if (numberDurationExpiration > countOfPrices) {
           // if(block.number >= currentDerivative.startExpirationBlock ||
         // block.number <= currentDerivative.endExpirationBlock) {
          poolDerivatives[hashDerivative].pricesExpiration[countOfPrices] = price;
          countOfPrices++;
          poolDerivatives[hashDerivative].averagePrice = countAvgPrice(currentDerivative.pricesExpiration);

      // }
      }

    }

   function getExpirationPrice(bytes32 hashDerivative) public view returns(int256) {
       return poolDerivatives[hashDerivative].averagePrice;
   }

   function closeExpiration(bytes32 hashDerivative) public onlyOwner {
      // InfoDerivative memory currentDerivative = poolDerivatives[hashDerivative];
      // if(block.number > currentDerivative.startExpirationBlock && currentDerivative.isActive == true) {
          poolDerivatives[hashDerivative].isActive = false;
          poolDerivatives[hashDerivative].isExpirate = true;
      // }
    }

    function countAvgPrice(int256[] memory prices) private view returns(int256 avgPrice) {
      int256 total;
      for (uint8 i = 0; i < countOfPrices; i++) {
        total += prices[i];
      }
      avgPrice = total / countOfPrices;
      return avgPrice;
    }
}

contract Board is PriceConsumerV3, Derivative {

  mapping (bytes32 => bool) public activeFutures;
  mapping(bytes32 => address[]) public derivativeInvestors;
  mapping(address => InfoDerivative[]) public pullInvestorDerivative;

  event AddedExpirationPrice(int256 price, bytes32 hashDerivative);
  event CreatedDerivative(bytes32 hashDerivative);
  event BoughtPrice(bytes32 hashDerivative, uint256 amount, uint256 predictionPrice, address investor);
  function createNewDerivative(uint256 startExpirationBlockNumber) public onlyOwner {
    bytes32 hash = createDerivative(startExpirationBlockNumber);
    activeFutures[hash] = true;
    emit CreatedDerivative(hash);
  }

  function expirateDerivative(bytes32 hashDerivative) public onlyOwner {
    closeExpiration(hashDerivative);
    activeFutures[hashDerivative] = false;
  }

  function addExpirationPrice(bytes32 hashDerivative) public onlyOwner {
      if(activeFutures[hashDerivative] == true) {
          int price = PriceConsumerV3.getLatestPrice();
           setExpirationPrice(price, hashDerivative);
           emit AddedExpirationPrice(price, hashDerivative);
      }

  }

  function buyDerivative(bytes32 hashDerivative, uint256 amount, uint256 predictionPrice) public  {
      derivativeInvestors[hashDerivative].push(address(msg.sender));
      emit BoughtPrice(hashDerivative, predictionPrice, amount, address(msg.sender));
  }

  function startPaymentAfterExpiration(bytes32 hashDerivative) public onlyOwner {
    if(activeFutures[hashDerivative] == false) {

    }
  }

}