"use client"

import { store, persistor } from "../store/store"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence } from "framer-motion";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AnimatePresence>
                    {children}
                </AnimatePresence>
            </PersistGate>
        </Provider>
    )
}
