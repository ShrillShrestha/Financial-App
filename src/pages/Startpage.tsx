import React, { useState } from 'react';
import {
  Wrapper,
  Banner,
  Logo,
  Desc,
  DescText,
  DescTitle,
  Logoutbutton,
  LoginPOS,
} from '../style/home';
import bannerlogo from '../assets/images/unitedWayLogoShadow.png';
import { Login } from '../components';

/*
 * Start page of the entire site, where users will get an overview of what this app is about, and where they will
 * login or creat their accounts
 */
const Startpage = ({
  login,
  loggedin,
  logout,
}: {
  login: any;
  loggedin: boolean;
  logout: any;
}): JSX.Element => {
  return (
    <div>
      <Wrapper>
        {/* This was the top banner and the log in original design */}
        {/* <Banner></Banner>
        <Logo href="http://www.unitedwaynela.org/">
          {' '}
          <img
            style={{ height: '90%', objectFit: 'contain' }}
            src={bannerlogo}
          />
        </Logo> */}
        <Desc>
          <DescTitle>Dollars & $ense Reality Fair</DescTitle>
          <DescText>
            The United Way of Northeast Louisiana Dollars & $ense Reality Fair
            is a financial education simulation during which high school
            students actively learn how to make better financial decisions and
            gain knowledge of budgeting, saving, and spending.
          </DescText>
        </Desc>
        {loggedin !== true ? (
          <LoginPOS>
            {/* Calling the LoginNumberTwo component with two props
                      @prop login an APi function for logging a user in
                      @prop loggedin a boolean to check if a user is logged in or not*/}
            <Login login={login} loggedin={loggedin} />
          </LoginPOS>
        ) : (
          <Logoutbutton onClick={() => logout()}> sign out </Logoutbutton>
        )}
      </Wrapper>

      <div></div>
      <div></div>
    </div>
  );
};

export default Startpage;
