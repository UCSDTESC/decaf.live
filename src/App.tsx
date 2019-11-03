import React, {useEffect, useState} from 'react';

function App() {

  const [text, setText] = useState("");

  useEffect(() => {
    fetch('/api/')
      .then(res => res.text())
      .then(setText)
  }, [setText]);

  return (
    <div>
      {text}
    </div>
  );
}

export default App;
