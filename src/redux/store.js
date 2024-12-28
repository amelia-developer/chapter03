import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist' // redux-persist을 쓸때 persistStore, persistReducer 필수옵션(너무 어렵게 생각하지마)
import storage from 'redux-persist/lib/storage'
import rootReducer from "./rootReducer"

const persistConfig = {
    key: 'root', // 로컬스토리지 키
    storage, // 로컬스토리지
    whitelist:['join'] // 타겟(리듀서 이름)
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,// configureStore의 옵션에 reducer가 있음, 그 옵션reducer에 rootReducer(회원가입 및 캘린더 서비스에서 리듀서계의 총책임자)를 넣어줌 ->
                         // 이걸 store라는 이름으로 만들어진 변수에 저장함
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk)
});

const persistor = persistStore(store);

export {store, persistor}