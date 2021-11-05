import React from "react"
import styled from "styled-components"

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({children}: AppLayoutProps) {
  return <Wrap>{children}</Wrap>
}

export type SideProps = {
  children: React.ReactNode
}

function Side({children}: SideProps) {
  return <Aside>{children}</Aside>
}

export type MainProps = {
  children: React.ReactNode
}

function Main({children}: MainProps) {
  return <MainBlock>{children}</MainBlock>
}

AppLayout.Side = Side;
AppLayout.Main = Main;

const Wrap = styled.div`
  margin: 0 60px;
`;

const Aside = styled.aside`
  width: 25.5rem;
  height: 100%;
  position: fixed;
  display: flex;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 3rem;
  background-color: white;
`;

const MainBlock = styled.main`
  padding-left: 2rem;
  margin-left: 25.5rem;
  padding-top: 7.7rem;
  padding-bottom: 3rem;
  background-color: white;
`;