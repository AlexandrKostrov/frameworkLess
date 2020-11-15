import { Controller, Get } from '@nestjs/common';
import { Router } from 'express';
import { StateService } from './state.service';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) { }
  @Get()
  list() {
    return this.stateService.getStates();
  }
}
