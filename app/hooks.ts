import type { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

//Exporting Typed Hooks
//We're going to be using React-Redux's useSelector and useDispatch hooks extensively in our components.

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
