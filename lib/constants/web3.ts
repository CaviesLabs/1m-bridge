export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

export const VAULT_ABI = [
  "function convertToShares(uint256 amount) view returns (uint256)",
  "function convertToAssets(uint256 amount) view returns (uint256)",
  "function deposit(uint256 assets, address receiver) external returns (uint256)",
  "function withdraw(uint256 assets, address receiver, address owner) external returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
];

export const WETH_GATEWAY_ABI = [
  "function depositETH(address onBehalfOf) external payable",
  "function withdrawETH(uint256 amount, address receiver, address _owner, uint256 maxLoss, address[] calldata strategies) external",
];
