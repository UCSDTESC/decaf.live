import React, {Component} from 'react';
import styled from 'styled-components';

const LIGHT_BLUE = "blue"
const PURPLE = "white"


const ContentSection = styled.section`
    text-align: center;
    padding: 1rem;
    position: relative;
    transform: translateY(-2px);
`

const ContactHeader = styled.h1`
    color: white;
    z-index: 2;
    line-height: 1.7;
`

const ContactLink = styled.a`
    color: lightblue !important;
`

const FooterContainer = styled.footer`
    margin: 2rem 0 1rem;
`

const FooterLinks = styled.ul`
    list-style: none;
    padding: 0;
`

const FooterLinkItem = styled.li`
    font-size: 1.75rem;
    //width: 80%;
    //margin-left: 10%;
	margin: auto;
`

const FooterLink = styled.a`
    color: ${PURPLE} !important;
    i {
    }
`
const FooterLogo = styled.img`
    display: block;
	margin: auto;
    width:150px;
`

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <ContentSection className="contact" id="contact">
                    <div className="container-fluid d-flex align-items-center h-100">
                        <ContactHeader className="m-auto">
                            Talk to us at <ContactLink className="contact__link" href="mailto:hello@tesc.ucsd.edu">hello@tesc.ucsd.edu</ContactLink> if you have any questions.
                        </ContactHeader>
                    </div>
                </ContentSection>
                <FooterContainer className="footer" id="footer">
                    <div className="">
                        <FooterLinks className="d-flex flex-row">
                            <FooterLinkItem>
                                <FooterLink target="_new" href="https://www.facebook.com/ucsd.tesc/">
                                <i className="fab fa-facebook-square" />
                                </FooterLink>
                            </FooterLinkItem>
                            <FooterLinkItem>
                                <FooterLink target="_new" href="https://twitter.com/ucsdtesc">
                                <i className="fab fa-twitter-square" />
                                </FooterLink>
                            </FooterLinkItem>
                            <FooterLinkItem>
                                <FooterLink href="http://tesc.ucsd.edu" target="_new">
                                    <FooterLogo src="/TESC_full_logo_light.png"></FooterLogo>
                                </FooterLink>
                            </FooterLinkItem>
                            <FooterLinkItem>
                                <FooterLink target="_new" href="https://www.instagram.com/ucsdtesc/">
                                <i className="fab fa-instagram" />
                                </FooterLink>
                            </FooterLinkItem>
                            <FooterLinkItem>
                                <FooterLink target="_new" href="mailto://hello@tesc.ucsd.edu">
                                <i className="fas fa-envelope-square" />
                                </FooterLink>
                            </FooterLinkItem>
                        </FooterLinks>
                    </div>
                </FooterContainer>
            </div>
        )
    }
}

export default Footer;