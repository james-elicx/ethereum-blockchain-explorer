import { FlexBox, SearchBox } from '../../components';
import { Blocks, Transactions } from '../../components/web3';
import { InfuraProvider } from '../../contexts';

export const App = (): JSX.Element => {
  return (
    <>
      {/* <h1 style={{ margin: '1em' }}>Blockchain Explorer</h1> */}

      <FlexBox direction="col">
        <SearchBox />

        <InfuraProvider>
          <FlexBox justify="center" wrap="wrap" style={{ margin: 5 }}>
            <FlexBox direction="col" style={{ margin: 5 }}>
              <span style={{ margin: '10px 15px', fontSize: '18px' }}>Recent Blocks</span>
              <Blocks />
            </FlexBox>

            <FlexBox direction="col" style={{ margin: 5 }}>
              <span style={{ margin: '10px 15px', fontSize: '18px' }}>Recent Transactions</span>
              <Transactions />
            </FlexBox>
          </FlexBox>
        </InfuraProvider>
      </FlexBox>
    </>
  );
};
