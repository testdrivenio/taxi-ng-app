import { IsDriver } from './is-driver.service';
import { createFakeToken, createFakeUser } from '../testing/factories';

describe('IsDriver', () => {
  let isDriver: IsDriver;

  beforeEach(() => {
    isDriver = new IsDriver();
  });

  it('should allow a driver to access a route', () => {
    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser({ group: 'driver' }))
    ));
    expect(isDriver.canActivate()).toBeTruthy();
  });

  it('should not allow a non-driver to access a route', () => {
    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser({ group: 'rider' }))
    ));
    expect(isDriver.canActivate()).toBeFalsy();
  });
});
