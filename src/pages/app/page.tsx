import { FlexBox } from '../../components';
import { Blocks, Transactions } from '../../components/web3';
import { InfuraProvider } from '../../contexts';

export const App = (): JSX.Element => {
  return (
    <>
      <h1>Hello World</h1>

      <InfuraProvider>
        <FlexBox style={{ margin: 10 }}>
          <FlexBox direction="col" style={{ marginRight: 5 }}>
            <span style={{ margin: '10px 15px', fontSize: '18px' }}>Recent Blocks</span>
            <Blocks />
          </FlexBox>

          <FlexBox direction="col" style={{ marginLeft: 5 }}>
            <span style={{ margin: '10px 15px', fontSize: '18px' }}>Recent Transactions</span>
            <Transactions />
          </FlexBox>
        </FlexBox>
      </InfuraProvider>
    </>
  );
};
