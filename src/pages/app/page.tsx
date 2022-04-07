import { FlexBox } from '../../components';
import { Blocks, Transactions } from '../../components/web3';
import { ChainProvider } from '../../contexts';

export const App = (): JSX.Element => {
  return (
    <>
      <h1>Hello World</h1>

      <ChainProvider>
        <FlexBox>
          <FlexBox direction="col">
            <span style={{ margin: '10px 15px', fontSize: '18px' }}>Recent Blocks</span>
            <Blocks />
          </FlexBox>

          <FlexBox direction="col">
            <span style={{ margin: '10px 15px', fontSize: '18px' }}>Recent Transactions</span>
            <Transactions />
          </FlexBox>
        </FlexBox>
      </ChainProvider>
    </>
  );
};
