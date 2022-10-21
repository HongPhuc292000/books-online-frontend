import styled from "@emotion/styled";

const CardWithHoverContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const CardWithHover = styled.img`
  height: 100%;
  width: 100%;
  transition: transform 0.1s;
  border-radius: 4px;
  &:hover {
    transform: scale(1.05);
  }
`;

const StatusSticker = styled.span`
  position: absolute;
  top: 10px;
  left: -4px;
  background-color: red;
  color: #fff;
  font-size: 0.875rem;
  padding: 0 4px;
`;

export const SimpleCardImage = () => {
  return (
    <CardWithHoverContainer>
      <CardWithHover src="https://static.8cache.com/cover/o/eJzLyTDR1430dbb0NfWMd7MM1A9z8nWxDDLx8En11HeEgmzffH1ny6h4g_SkpNBAX_1yQyNL3QxDSyMAJFcRXQ==/vu-dong-can-khon.jpg" />
      <StatusSticker>AA</StatusSticker>
    </CardWithHoverContainer>
  );
};
