import React from "react";
import PropTypes from "prop-types";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles";

const TabIcon = ({name, color="rgba(100, 100, 100, 0.5)", size=22, group="Ionicons"}) => {
    if (group === "Ionicons"){
        return (
            <Ionicons 
                name={name}
                color={color}
                size={size}
            />
        )
    } else {
        return (
            <FontAwesome5
                name={name}
                color={color}
                size={size}
            />
        )
    }
}
    

TabIcon.propTypes = {
    name : PropTypes.string.isRequired,
    color : PropTypes.string,
    size : PropTypes.number,
    group : PropTypes.string
}

export default TabIcon;