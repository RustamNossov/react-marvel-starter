import React, { useState, useCallback}  from 'react';

import ComicsList from "../comicsList/ComicsList"
import AppBanner from "../appBanner/AppBanner"

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = ({onComicsChange}) => {

   

    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList 
                    onComicsChange={(e)=>onComicsChange(e)}/>
            </ErrorBoundary>
            {/* <ErrorBoundary>
                <SingleComic comicData={comicData}/>
            </ErrorBoundary> */}
        </>
    )
}

export default ComicsPage;