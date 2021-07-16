import React, {useCallback} from 'react';
import PostEditor from './PostEditor';
import Navbar from './Navbar';


function App() {
  const onListClick = useCallback((item: string) => {alert(item)}, [])
  return (
    <div>
      <Navbar items={['item1','item2']} onClick={onListClick}/>
App Component
<PostEditor/>
    </div>
  );
}

export default App;
