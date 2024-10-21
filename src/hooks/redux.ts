import { AppDispatch, RootState } from '@/redux/store';
import { useSelector as useAppSelector } from 'react-redux';
import { useDispatch as useAppDispatch } from 'react-redux';

export const useDispatch = useAppDispatch.withTypes<AppDispatch>();
export const useSelector = useAppSelector.withTypes<RootState>();
