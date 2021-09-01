import React from 'react';

interface IProps {
  text: string;
}
const TestComponent = ({ text }: IProps) => {
  return <p>{text}</p>;
};
function App() {
  const test = 'jake';

  return (
    <div>
      <TestComponent text={test} />
    </div>
  );
}
export default App;
