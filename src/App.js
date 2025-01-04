import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TwitterLogo from './Vector.png'; // Import as an image
import TelegramLogo from './dis.png'; // Import as an image
import sign from './plus-sign.png';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: black;
`;

const Header = styled.div`
  position: absolute;
  top: 28px;
  display: flex;
  justify-content: space-between; /* Space out the title, nav, and social icons */
  align-items: center;
  width: 90%;
  padding: 0 50px; /* Padding around the navbar */
`;

const Title = styled.div`
  color: white;
  font-size: 64px;
  font-family: 'Just Me Again Down Here', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center; /* Center the nav items */
  align-items: center;
  gap: 27px;
  flex-grow: 1; /* Take up available space between the title and social icons */
`;

const NavItem = styled.div`
  color: white;
  font-size: 40px;
  font-family: 'Just Me Again Down Here', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
  opacity: ${props => props.opacity || 1};
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-end; /* Align the icons to the right */
  align-items: center;
  gap: 20px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Subtitle = styled.div`
  color: white;
  font-size: 64px;
  font-family: 'Just Me Again Down Here', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
  margin-top: 50px;
`;

const JoinButton = styled.div`
  padding-left: 146px;
  padding-right: 146px;
  border: 1px solid white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
  cursor: pointer;
`;

const JoinText = styled.div`
  color: white;
  font-size: 40px;
  font-family: 'Just Me Again Down Here', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 40px;
  font-family: 'Just Me Again Down Here', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const FormContainer = styled.div`
  width: 591px;
  height: 501px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ show }) => (show ? 'block' : 'none')};
  font-family: 'Just Me Again Down Here', sans-serif;
`;

const FormHeading = styled.div`
  font-size: 32px;
  font-family: 'Just Me Again Down Here', sans-serif;
  color: black;
  margin-bottom: 20px;
  text-align: left;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormSection = styled.div`
  display: flex;
  justify-content: space-between; /* Space out the buttons and plus sign */
  align-items: center; /* Vertically center items */
  gap: 20px;
  font-family: 'Just Me Again Down Here', sans-serif;
`;

const FormButton = styled.a`
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 12px;
  font-size: 28px;
 font-family: 'Just Me Again Down Here', sans-serif;
  color: #0D70E3;
  text-decoration: none;
  cursor: pointer;
  width: 250px;
`;

const CheckboxPlus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the plus sign in the middle */
  gap: 10px;
  flex-grow: 1; /* Allow the plus sign to grow and occupy space */
`;

const PlusSign = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid black;
  border-radius: 12px;
  font-size: 32px;
  color: rgba(0, 0, 0, 0.5);
  font-family: 'Just Me Again Down Here', sans-serif;
`;

const FormSubmit = styled.div`
  padding: 10px;
  background: black;
  border: 1px solid black;
  border-radius: 12px;
  font-size: 32px;
  font-family: 'Just Me Again Down Here', sans-serif;
  text-align: center;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: blueviolet;
  }
`;

const MyComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // Time remaining in seconds

  const TIMER_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

  // Get start time from localStorage or set to current time if not set
  const getStartTime = () => {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      return parseInt(storedStartTime, 10);
    } else {
      const currentTime = Date.now();
      localStorage.setItem('startTime', currentTime.toString());
      return currentTime;
    }
  };

  const startTime = getStartTime();

  // Calculate the remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timePassed = currentTime - startTime;
      const timeLeft = TIMER_DURATION - timePassed;

      if (timeLeft <= 0) {
        setIsTimeUp(true);
        setRemainingTime(0);
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startTime]);

  const formatCountdown = () => {
    const hours = Math.floor(remainingTime / 1000 / 60 / 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleJoinClick = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    <Container>
      <Header>
        <Title>Scribbles</Title>
        <Nav>
          <NavItem>Home</NavItem>
          <NavItem opacity={0.5}>Media</NavItem>
          <NavItem opacity={0.5}>Staking</NavItem>
        </Nav>
        <SocialIcons>
          <SocialIcon>
            <img src={TwitterLogo} alt="Twitter" />
          </SocialIcon>
          <SocialIcon>
            <img src={TelegramLogo} alt="Telegram" />
          </SocialIcon>
        </SocialIcons>
      </Header>
      <MainContentWrapper>
        <Subtitle>Scribbles where creativity meets fun</Subtitle>
        <JoinButton onClick={handleJoinClick}>
          <JoinText>Join the Verse</JoinText>
        </JoinButton>
      </MainContentWrapper>
      <Footer>Copyright 2025</Footer>

      {/* Form Container */}
      <FormContainer show={showForm}>
        <FormHeading>
          READY TO DISCOVER THE MYSTERY
          <br />
          ending in <span style={{ color: 'blue' }}>{formatCountdown()}</span>
        </FormHeading>
        <FormBody>
          <FormSection>
            <FormButton
              href="https://x.com/parabellu_m?s=21"
              target="_blank"
              rel="noopener noreferrer"
            >
              FOLLOW
            </FormButton>

            <CheckboxPlus>
              <PlusSign img src={sign} alt="Plus Sign" />
            </CheckboxPlus>

            <FormButton
              href="https://x.com/Parabellu_m/status/1839334847715897776"
              target="_blank"
              rel="noopener noreferrer"
            >
              RT
            </FormButton>
          </FormSection>

          <FormButton
            href="https://x.com/Parabellu_m/status/1839334847715897776"
            target="_blank"
            rel="noopener noreferrer"
          >
            TAG 3 @FRIENDS
          </FormButton>

          <FormInput
            type="text"
            placeholder="SOLANA WALLET ADDRESS"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            disabled={isTimeUp}
          />

          <FormSubmit disabled={isTimeUp}>
            {isTimeUp ? 'TIME UP' : 'SUBMIT'}
          </FormSubmit>
        </FormBody>
      </FormContainer>
    </Container>
  );
};

export default MyComponent;
