// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressValueMap {

    // Struct to represent a pair of datetime and uint8
    struct DateTimeValuePair {
        uint256 datetime;
        uint8 value;
    }

    // Mapping of addresses to an array of DateTimeValuePair structs
    mapping(address => DateTimeValuePair[]) public userHistory;
    // Mapping of addresses to uint8 values
    // Here we will store the continuous count of user
    mapping(address => uint8) public addressValueMap;

    // Event to log changes in the mapping
    event ValueUpdated(address indexed _address, uint8 _value);
    event ListUpdated(address indexed _address, DateTimeValuePair[] _values);

    // List of all Users
    address[] public users;


    // Function to set the uint8 value for a given address
    function addNewRecord(address _address, uint8 _value) external {
        // Ensure that the value is within uint8 range
        require(_value <= 255, "Value must be between 0 and 255"); 

        // To ensure that we have unique entries in user array
        if (userHistory[_address].length == 0) {
            users.push(_address);
        }

        // Use the current timestamp as the datetime
        uint256 currentDatetime = block.timestamp;

        userHistory[_address].push(DateTimeValuePair(currentDatetime, _value));
        emit ListUpdated(_address, userHistory[_address]);
    }

    // Function to get the uint8 value for a given address
    function getValue(address _address) external view returns (DateTimeValuePair[] memory) {
        return userHistory[_address];
    }

    // View function to get the entire addressDateTimeMap for all addresses
    function getAllAddressDateTimeMap() external view returns (address[] memory, DateTimeValuePair[][] memory) {
        uint256 totalAddresses = users.length;

        DateTimeValuePair[][] memory allValues = new DateTimeValuePair[][](totalAddresses);

        for (uint256 i = 0; i < totalAddresses; i++) {
            allValues[i] = userHistory[users[i]];
        }

        return (users, allValues);
    }
}