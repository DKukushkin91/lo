import {withHocs} from './hocs';
import {RootNavigator} from './navigators/root';

const App = () => RootNavigator();

export default withHocs(App);
