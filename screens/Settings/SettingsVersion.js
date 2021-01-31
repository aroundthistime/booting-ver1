import React from "react"
import { ScrollView } from "react-native";
import styled from "styled-components";
import { PATCH_LIST } from "../../patchList";

const View = styled.View`
    flex : 1;
    background-color : ${props => props.theme.bgColor};
    padding-top : 20;
    padding-bottom : 20;
    padding-left : 25;
    padding-right : 25;
`

const PatchContainer = styled.View`
    margin-bottom : 25;
`

const PatchVersion = styled.Text`
    font-size : 20;
    margin-bottom : 8;
`

const PatchContent = styled.View`
    opacity : 0.6;
    margin-bottom : 5;
    flex-direction : row;
`

const PatchContentColumn = styled.Text`
    margin-right : 5;
`;

const PatchInfo = ({version, contents}) => (
    <PatchContainer>
        <PatchVersion>Ver {version}</PatchVersion>
        {contents.map(content => (
            <PatchContent>
                <PatchContentColumn>• </PatchContentColumn>
                <PatchContentColumn>{content}</PatchContentColumn>
            </PatchContent>
        )
        )}
    </PatchContainer>
)

export default () => (
    <View>
        <ScrollView>
            {PATCH_LIST.slice(0).reverse().map(patch => <PatchInfo {...patch} />)}
        </ScrollView>
    </View>
)