import { Box, Button, IconButton, Stack, Typography, Collapse } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import React from 'react'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

// theme style setted in theme.js

const CollapseMenu = ({ collapseIn }) => {
  return (
    <Collapse in={collapseIn} id="header-menu" role="region">
      <Stack spacing={6} direction="row" justifyContent="center" >
        <StateButton target="/work" imgSrc="work_icon" alt="go to Work" />
        <StateButton target="/" imgSrc="home_icon" alt="go to Home" />
        <StateButton target="/contact-us" imgSrc="contact_icon" alt="go to Contact Us" />
        <StateButton target="/team" imgSrc="team" alt="go to Team" />
        <StateButton target="/join" imgSrc="join" alt="go to Join Us" />
      </Stack>
      {/* <Stack spacing={8} direction="row" justifyContent="center" sx={{ display: { xs: 'flex', md: 'none' } }}>
      </Stack> */}
    </Collapse>
  )
}

const StateButton = ({
  target,
  imgSrc,
  alt,
}) => {
  const router = useRouter();
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = React.useCallback(() => { setIsHovered(true); }, []);
  const onMouseLeave = React.useCallback(() => { setIsHovered(false); }, []);
  // button hover effect
  React.useEffect(() => {
    setIsHovered(false)
  }, [router.pathname]);
  return (
    <Link href={target}>
      {
        // the effect of current page
        router.pathname === target ?
          <IconButton sx={{bgcolor: 'primary.main' }}>
            <Image src={`/${imgSrc}_2.svg`} width="50" height="50" alt={alt} />
          </IconButton>
  

          :
          <IconButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isHovering ?
              <Image src={`/${imgSrc}_2.svg`} width="50" height="50" alt={alt} className="animate__animated animate__pulse animate__infinite" />
              :
              <Image src={`/${imgSrc}_1.svg`} width="50" height="50" alt={alt} />
            }
          </IconButton>
      }
    </Link>
  )
}



const MenuButton = ({
  isOpen = false,
}) => {
  return (
    //3 line button 
    <Box
      className={isOpen ? 'opened' : ''}
      sx={{
        width: 40,
        height: 30,
        position: 'relative',
        transform: 'rotate(0deg)',
        transition: '.5s ease-in-out',
        cursor: 'pointer',
        '& span': {
          display: 'block',
          position: 'absolute',
          height: 3,
          width: '100%',
          background: '#222559',
          borderRadius: 0,
          opacity: 1,
          left: 0,
          transform: 'rotate(0deg)',
          transition: '.25s ease-in-out',
        },
        '& span:nth-child(1)': {
          top: 0,
        },
        '&.opened span:nth-child(1)': {
          top: 18,
          width: 0,
          left: 0.5,
        },
        '& span:nth-child(2)': {
          top: 14,
          background: '#cfcfcf',
        },
        '&.opened span:nth-child(2)': {
          transform: 'rotate(45deg)',
          background: '#cfcfcf',
        },
        '& span:nth-child(3)': {
          top: 14,
        },
        '&.opened span:nth-child(3)': {
          transform: 'rotate(-45deg)',
          background: '#cfcfcf',
        },
        '& span:nth-child(4)': {
          top: 28,
        },
        '&.opened span:nth-child(4)': {
          top: 18,
          width: 0,
          left: 0.5,
        },
      }}
    >
      <span />
      <span />
      <span />
      <span />
      <p style={visuallyHidden}>{isOpen ? "Close menu" : 'Open menu'}</p>
    </Box>
  )
}
 //3 line button 

const MyHeader = () => {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const handleCollapseToggle = React.useCallback(() => {
    setCollapseOpen(!collapseOpen);
  }, [collapseOpen]);

  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = () => { setCollapseOpen(false); };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => { router.events.off("routeChangeComplete", handleRouteChange); };
  }, [router.events]);


  return (
    <Box component="header" sx={{ p: 1}}>
      <Stack component="nav" sx={{ pt: 3 , px: "6rem"}} alignItems="center" justifyContent="space-between" direction="row">
        <Image src="/logo-180x180.png" alt="me" width="84" height="84" />
        <IconButton
          className="disable-hover"
          color="inherit"
          sx={{ py: 0 }}
          onClick={handleCollapseToggle}
          aria-controls="header-menu"
          aria-expanded={collapseOpen ? 'true' : 'false'}>
          <MenuButton isOpen={collapseOpen} />
        </IconButton>
        <CollapseMenu collapseIn={collapseOpen} />
      </Stack>
    </Box >
  )
}


export default MyHeader;