import { TestBed } from '@angular/core/testing';

import { ConnectionToServerService } from './connection-to-server.service';

describe('ConnectionToServerService', () => {
  let service: ConnectionToServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionToServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
