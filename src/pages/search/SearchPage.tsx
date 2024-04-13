import React from "react";

import {SearchBar} from "src/shared/components/SearchBar";
import {SignInButton} from "src/shared/components/SignInButton";
import {Space} from "src/shared/components/Space";
import {SignUpButton} from "src/shared/components/SupportButton";
import {Title} from "src/shared/components/Title";

import styles from "./styles.module.scss";

export function SearchPageHeader() {
    return (
        <SearchBar
            sx={{
                width: 400
            }}
            placeholder="Search Google Maps"
            inputProps={{'aria-label': 'search google maps'}}
        />
    );
}

export function SearchPage() {
    return (
        <div className={styles.searchPage}>
            <div className={styles.buttons}>
                <SignInButton/>
                <SignUpButton/>
            </div>
            <div className={styles.main}>
                <div className={styles.assets}>
                    <div className={styles.image}/>
                    <Title/>
                </div>
                <SearchBar/>
            </div>
            <Space/>
        </div>
    );
}
