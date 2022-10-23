import styled from "@emotion/styled";

const CardWithHoverContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  transition: transform 0.15s;
  box-shadow: 0 1px 2px #b5b5b5;
  border: 0.5px solid #b5b5b5;
  &:hover {
    transform: scale(1.05);
    & p:last-child {
      opacity: 1;
    }
  }
`;

const CardWithHover = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`;

const StatusSticker = styled.p`
  position: absolute;
  top: 10px;
  left: -4px;
  background-color: red;
  color: #fff;
  font-size: 0.875rem;
  padding: 0 4px;
  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    border-top: 4px solid red;
    border-left: 4px solid transparent;
    filter: brightness(80%);
  }
`;

const StatusStickerTail = styled.span`
  position: absolute;
  left: 100%;
  display: inline-block;
  height: 100%;
  border-top: 8px solid red;
  border-right: 8px solid transparent;
  border-bottom: 8px solid red;
`;

const BookTitle = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.75rem;
  padding: 6px 0;
  text-align: center;
  opacity: 0;
  transition: all linear 0.15s;
`;

export const SimpleCardImage = () => {
  return (
    <CardWithHoverContainer>
      <CardWithHover src="https://static.8cache.com/cover/o/eJzLyTDR1430dbb0NfWMd7MM1A9z8nWxDDLx8En11HeEgmzffH1ny6h4g_SkpNBAX_1yQyNL3QxDSyMAJFcRXQ==/vu-dong-can-khon.jpg" />
      <StatusSticker>
        Flash <StatusStickerTail></StatusStickerTail>
      </StatusSticker>
      <BookTitle>haha</BookTitle>
    </CardWithHoverContainer>
  );
};
