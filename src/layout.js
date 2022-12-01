import { Layout } from 'react-admin';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as React from "react";

export const MyLayout = props => (
    <>
        <Layout {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);