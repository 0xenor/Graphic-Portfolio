"use client";
import React from "react";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// ── Spinner ──────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { transform: scale(0); opacity: 0.5; }
  50%       { transform: scale(1); opacity: 1;   }
`;

const SpinnerWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  --uib-speed: 0.9s;
  height: 3.5rem;
  width: 3.5rem;
`;

const Dot = styled.div`
  position: absolute;
  top: 0; left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;

  &::before {
    content: '';
    height: 20%; width: 20%;
    border-radius: 50%;
    background-color: #bb00ff;
    filter: drop-shadow(0 0 8px #bb00ff);
    box-shadow: 0 0 20px rgba(187, 0, 255, 0.4);
    transform: scale(0);
    opacity: 0.5;
    animation: ${pulse} calc(var(--uib-speed) * 1.111) ease-in-out infinite;
  }

  &:nth-child(2) { transform: rotate(45deg);  &::before { animation-delay: calc(var(--uib-speed) * -0.875); } }
  &:nth-child(3) { transform: rotate(90deg);  &::before { animation-delay: calc(var(--uib-speed) * -0.75);  } }
  &:nth-child(4) { transform: rotate(135deg); &::before { animation-delay: calc(var(--uib-speed) * -0.625); } }
  &:nth-child(5) { transform: rotate(180deg); &::before { animation-delay: calc(var(--uib-speed) * -0.5);   } }
  &:nth-child(6) { transform: rotate(225deg); &::before { animation-delay: calc(var(--uib-speed) * -0.375); } }
  &:nth-child(7) { transform: rotate(270deg); &::before { animation-delay: calc(var(--uib-speed) * -0.25);  } }
  &:nth-child(8) { transform: rotate(315deg); &::before { animation-delay: calc(var(--uib-speed) * -0.125); } }
`;

const Spinner = () => (
  <SpinnerWrap>
    {[...Array(8)].map((_, i) => <Dot key={i} />)}
  </SpinnerWrap>
);

// ── Overlay ──────────────────────────────────────────────
const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  pointer-events: ${p => p.$visible ? "all" : "none"};
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.7s ease;
`;

const LoadingText = styled.p`
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
`;

// ── Main component ────────────────────────────────────────
interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  // FIX: On mobile (< 768px) skip the loader entirely — initialise
  // loading/visible to false so the overlay is never mounted.
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [loading, setLoading] = useState(!isMobile);
  const [visible, setVisible] = useState(!isMobile);

  useEffect(() => {
    // Mobile: loader was never shown, nothing to do.
    if (isMobile) return;

    const done = () => {
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setLoading(false), 700);
      }, 600);
    };

    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done);
      return () => window.removeEventListener("load", done);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <Overlay $visible={visible}>
          <Spinner />
          <LoadingText>Loading...</LoadingText>
        </Overlay>
      )}
      {children}
    </>
  );
}