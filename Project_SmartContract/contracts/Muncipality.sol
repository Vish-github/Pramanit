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
        uint uid;
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
        isPresent[uid]=true;
        return true;

        }
        else{
            return false;
        }
    }
    function AddUserBirthHash(uint munId,uint uid,string memory _BirthHash) public returns(bool){
        if(CheckPresence(munId)){
            UserData memory newUser=UserData({
                uid:uid,
                BirthHash:_BirthHash,
                DeathHash:' ',
                length:UserLength
            });
            allUser.push(newUser);

            return true;

        }
        else{
            return false;
        }
    } 
    function AddDeathhash(uint munId,uint uid,string memory _DeathHash) public returns(bool){
        if(CheckPresence(munId)){
            UserData memory deadUser=allUser[uid];
            deadUser.DeathHash=_DeathHash;
            return true;
        }
        else{
            return false;
        }
    }
    function getBirthCertificate(uint uid) public returns(UserData memory){
        UserData memory foundUser=allUser[uid];
        return foundUser;
    }
    function getAllData() public returns(UserData[] memory){
        return allUser;
    }

}