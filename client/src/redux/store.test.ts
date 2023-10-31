import store from './store'

describe('Test redux store', () => {
  it('Should return initial state correctly', () => {
    const initialStates = store.getState();
    console.log(initialStates)
    expect(initialStates).toEqual({ 
        auth:{
            loginUser:{},
            fetchLoginUserStatus:"IDLE"
        }
    })
  })
})