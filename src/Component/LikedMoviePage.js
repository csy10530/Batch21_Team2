import Wrapper from "../Container/Wrapper";

import Page2 from "../Component/Page2";
import Body from "../Container/Body";
import React from "react";

const navValue = ["main", "list", "like", "block"];

const LikedMoviePage = ({likedMovies}) => {
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

export default LikedMoviePage;