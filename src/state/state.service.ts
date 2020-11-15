import { Repository } from 'typeorm';
import StateEntity from './state.entity';

export class StateService {
  constructor(private _repository: Repository<StateEntity>) { }
  getStates() {
    return this._repository.find();
  }
}
