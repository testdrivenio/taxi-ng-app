import { IsDriver } from './is-driver.service';
import { UserFactory } from '../testing/factories';

describe('IsDriver', () => {
  it('should allow a driver to access a route', () => {
    const isDriver: IsDriver = new IsDriver();
    localStorage.setItem('taxi.user', JSON.stringify(
      UserFactory.create({group: 'driver'})
    ));
    expect(isDriver.canActivate()).toBeTruthy();
  });
  it('should not allow a non-driver to access a route', () => {
    const isDriver: IsDriver = new IsDriver();
    localStorage.setItem('taxi.user', JSON.stringify(
      UserFactory.create({group: 'rider'})
    ));
    expect(isDriver.canActivate()).toBeFalsy();
  });
});
