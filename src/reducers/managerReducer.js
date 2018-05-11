import { MANAGER_FETCH_CHEF, MANAGER_FETCH_DELIVERY, 
  MANAGER_FETCH_FAIL, MANAGER_REMOVE_WARNING,
  MANAGER_FETCH_APPROVAL, ASSIGN_DELIVERY, MANAGER_FETCH_ORDERS,
} from '../actions/types.js';

const initialState = {
  loading: false,
  chefs: [],
  deliverys: [],
  approvals: [],
  pendingOrders: [],
}

export default function(state = initialState, action) {
  switch(action.type) {

    case MANAGER_FETCH_CHEF:
      const newChefs = action.payload.map((chef) => {
        chef.fields.pk = chef.pk;
        chef.fields.role = 'chef';
        return chef.fields;
      })
      return {
        ...state,
        chefs: newChefs,
      }
    case MANAGER_FETCH_DELIVERY:
      const newDelivs = action.payload.map((deliv) => {
        deliv.fields.status === 0 ? ( 
          deliv.fields.status = 'Available' 
        ) : (
          deliv.fields.status = 'Busy' 
        );
        deliv.fields.pk = deliv.pk;
        deliv.fields.role = 'delivery';
        return deliv.fields;
      })
      return {
        ...state, 
        deliverys: newDelivs,
      }
    case MANAGER_REMOVE_WARNING:
      return {
        ...initialState,
      }
    case MANAGER_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case MANAGER_FETCH_APPROVAL:
      const newApprovals = action.payload.map((approve) => {
        return {
          name: approve.fields.user_fname + ' ' + approve.fields.user_lname,
          email: approve.fields.email,
          pk: approve.pk,
        }
      })
      return {
        ...state,
        approvals: newApprovals,
      }
    case ASSIGN_DELIVERY:
      return {
        ...state,
      }
    case MANAGER_FETCH_ORDERS:
      const finalOrders = action.payload.map((order) => {
        order.fields.pk = order.pk;
        return order.fields;
      })
      return {
        ...state,
        pendingOrders: finalOrders,
      }

    default:
      return state;
  }
}
