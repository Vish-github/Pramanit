// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.5.8;
 
contract Muncipality{
    address public Owner;
    MuncipalityData[] public allMun;
    UserData[] public allUser;
    struct MuncipalityData{
        address muncipalityadrress;
        uint uid;
        uint length;
    }
    struct UserData{
        string uid;
        string BirthHash;
        string DeathHash;
        uint length;
    }

    mapping (uint=>bool) public isPresent;
    uint public MuncipalityLength=0;
    uint public UserLength=0;
    constructor() public{
        Owner=msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender==Owner);
        _;
    }
    function CheckPresence(uint uid) public returns(bool){
        if(isPresent[uid]==true){
            return true;
        }
        return false;
    }
    function AddMuncipality(address muncipalityadrress,uint uid) public onlyOwner returns (bool){
        if(!CheckPresence(uid)){
        MuncipalityData memory NewMuncipality=MuncipalityData({
            muncipalityadrress:muncipalityadrress,
            uid:uid,
            length:MuncipalityLength
        });

        allMun.push(NewMuncipality);
           MuncipalityLength+=1;
        isPresent[uid]=true;
        return true;

        }
        else{
            return false;
        }
    }
    function AddUserBirthHash(uint munId,string memory uid,string memory _BirthHash) public returns(bool){
        if(CheckPresence(munId)){
            UserData memory newUser=UserData({
                uid:uid,
                BirthHash:_BirthHash,
                DeathHash:' ',
                length:UserLength
            });
            allUser.push(newUser);
              UserLength+=1;
            return true;

        }
        else{
            return false;
        }
    } 
    function AddDeathhash(uint munId,string memory uid,string memory _DeathHash) public returns(bool){
        if(CheckPresence(munId)){
            UserData memory deadUser;
            for(uint i=0;i<UserLength;i++){
                if (keccak256(abi.encodePacked(allUser[i].uid)) == keccak256(abi.encodePacked(uid))) {
                // if(allUser[i].uid==uid){
                    // console.log('In here');
                    deadUser=allUser[i];
                }
            }
            deadUser.DeathHash=_DeathHash;
            return true;
        }
        else{
            return false;
        }
    }
    function getBirthCertificate(string memory uid) public view returns(string memory){
            for(uint i=0;i<UserLength;i++){
                if (keccak256(abi.encodePacked(allUser[i].uid)) == keccak256(abi.encodePacked(uid))){
                    return allUser[i].BirthHash;
                }
            }
            return "No user with this id found";

    }
          function getDeathCertificate(string memory uid) public view returns(string memory){
            for(uint i=0;i<UserLength;i++){
                 if (keccak256(abi.encodePacked(allUser[i].uid)) == keccak256(abi.encodePacked(uid))){
                    return allUser[i].DeathHash;
                }
            }
            return "No user with this id found";

    }
    function getAllData() public view returns(UserData[] memory){
        return allUser;
    }

}