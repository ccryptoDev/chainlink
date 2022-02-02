// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

import "./IERC165.sol";

abstract contract ERC165 is IERC165 {
  /**
    * @notice Query if a contract implements an interface
    * @param _interfaceID The interface identifier, as specified in ERC-165
    * @return `true` if the contract implements `_interfaceID`
    */
  function supportsInterface(bytes4 _interfaceID)
      public
      override
      pure
      virtual
      returns (bool)
  {
      return _interfaceID == this.supportsInterface.selector;
  }
}
