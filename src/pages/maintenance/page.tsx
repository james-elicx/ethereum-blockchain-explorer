import { FlexBox } from '../../components';

export const Maintenance = (): JSX.Element => {
  return (
    <FlexBox
      direction="col"
      justify="center"
      align="center"
      style={{ margin: 15, marginTop: 'auto', textAlign: 'center' }}
    >
      <h1>This page is currently undergoing maintenance</h1>
      <span style={{ fontSize: 20 }}>Please check back later.</span>
    </FlexBox>
  );
};
