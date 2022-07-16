import Wrapper from "../Container/Wrapper";

import Page2 from "../Component/Page2";
import Body from "../Container/Body";
import React from "react";

const navValue = ["main", "list", "like", "block"];

const BlockedMoviePage = ({blockedMovies, navHandler}) => {
    return (
        <Wrapper>

            <Body>
                <React.Fragment>
                    {/*<Page2/>*/}
                </React.Fragment>


            </Body>

        </Wrapper>
    )
}

export default BlockedMoviePage;