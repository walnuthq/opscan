import { getContract, Address } from "viem";
import { l2PublicClient } from "@/lib/chains";
import abi from "@/lib/contracts/erc-20/abi";

const getERC20Contract = (address: Address) =>
  getContract({
    address,
    abi,
    client: l2PublicClient,
  });

export default getERC20Contract;
