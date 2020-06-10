import React from 'react';
import ReactDOM from  'react-dom';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';
import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage';
import AddExpensePage from '../components/AddExpensePage';
import HelpPage from '../components/HelpPage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () =>(
    <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route path="/" component={ExpenseDashBoardPage} exact={true}></Route>
                    <Route path="/create" component={AddExpensePage}></Route>
                    <Route path="/edit/:id" component={EditExpensePage}></Route>
                    <Route path="/help" component={HelpPage}></Route>
                    <Route component={NotFoundPage}></Route>
                </Switch>
            </div>
    </BrowserRouter>
)
export default AppRouter
