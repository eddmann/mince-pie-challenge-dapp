import React from 'react';
import ReactDOM from 'react-dom';

import { fetchAccounts, fetchPies, addPie, registerPieAddedEvent, ratePie, registerPieRatedEvent } from './api';
import App from './App';

import 'semantic-ui-css/semantic.min.css';

(async () => {
  ReactDOM.render(
    <App
      accounts={await fetchAccounts()}
      fetchPies={fetchPies}
      addPie={addPie}
      registerPieAddedEvent={registerPieAddedEvent}
      ratePie={ratePie}
      registerPieRatedEvent={registerPieRatedEvent}
    />,
    document.getElementById('root'),
  );
})();
