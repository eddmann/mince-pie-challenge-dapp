pragma solidity ^0.4.0;

contract MincePieChallenge {
  event PieRated(uint indexed id, uint total, uint average);

  event PieAdded(uint indexed id, string name, string photoHash, bool isRatable);

  address public admin;
  bool public isActive;

  struct Rating {
    mapping (address => bool) hasRated;
    uint total;
    uint sum;
    uint average;
  }

  struct Pie {
    bool isPresent;
    string name;
    string photoHash;
    address addedBy;
    Rating rating;
  }

  mapping (uint => Pie) private pies;
  uint public totalPies;

  modifier onlyActive() {
    require(isActive, "The challenge must be active to perform this action");
    _;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, "Only the admin can perform this action");
    _;
  }

  constructor() public {
    admin = msg.sender;
    isActive = true;
  }

  function activate() public onlyAdmin {
    require(!isActive, "The challenge is already active");
    isActive = true;
  }

  function deactivate() public onlyAdmin onlyActive {
    isActive = false;
  }

  function addPie(string name, string photoHash) public onlyActive {
    uint id = totalPies;
    pies[id] = Pie(true, name, photoHash, msg.sender, Rating(0, 0, 0));
    totalPies++;
    emit PieAdded(id, name, photoHash, true);
  }

  function ratePie(uint id, uint rating) public onlyActive {
    require(pies[id].isPresent, 'This pie does not exist');
    require(!pies[id].rating.hasRated[msg.sender], 'You have already rated this pie');

    Rating storage pieRating = pies[id].rating;
    pieRating.hasRated[msg.sender] = true;
    pieRating.total += 1;
    pieRating.sum += rating;
    pieRating.average = pieRating.sum / pieRating.total;

    emit PieRated(id, pieRating.total, pieRating.average);
  }

  function getPie(uint id) public view returns (uint, string, string, bool, uint, uint) {
    if (!pies[id].isPresent) {
      return (0, '', '', false, 0, 0);
    }

    Pie storage pie = pies[id];
    return (id, pie.name, pie.photoHash, !pie.rating.hasRated[msg.sender], pie.rating.total, pie.rating.average);
  }
}
