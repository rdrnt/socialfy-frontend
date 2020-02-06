import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { motion, AnimatePresence } from 'framer-motion';

import Container from '../container';
import Icon from '../Icon';

import UserShareModal from './UserShare';

import config from '../../config';
import { Style } from '../../helpers';

const ModalLookupTable = {
  USER_SHARE: <UserShareModal />,
};

const AnimatedContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: black;

  /* The container */
  > div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CloseModalButton = styled.button`
  margin: 0;
  padding: 0;
  height: 25px;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: ${config.spacing}px;
  margin-top: ${config.spacing}px;
`;

const StyledDialogOverlay = styled(DialogOverlay)`
  [data-reach-dialog-content] {
    background-color: ${config.colors.background};
    height: 75%;
    width: 50%;
    ${Style.size.mobile`
    height: 90%;
    width: 100%;
  `}
  }
`;

const Modal = ({ open, type, extra, close }) => {
  const modalFromType = ModalLookupTable[type];

  return (
    <AnimatePresence>
      {open && modalFromType && (
        <StyledDialogOverlay
          key="modal"
          onDismiss={() => {
            console.log('dismiss!');
            close();
          }}
        >
          <AnimatedContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CloseModalButton type="button" onClick={close}>
              <Icon name="x" color="white" />
            </CloseModalButton>
            <Container>
              <DialogContent aria-label="User modal">
                {React.cloneElement(modalFromType, {
                  close,
                  data: extra,
                })}
              </DialogContent>
            </Container>
          </AnimatedContainer>
        </StyledDialogOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
