<?php

/**
 * Description of Customer class
 * Simple model class to hold customer data.
 *
 * @author David Bardwell
 */
class Customer {
    private $key;
    private $firstName;
    private $lastName;
    private $address1;
    private $address2;
    private $city;
    private $state;
    private $zipcode;
    
    // constructor
    public function __construct($customerInfo) {
        $this->key = $customerInfo['key'];
        $this->firstName = $customerInfo['firstName'];
        $this->lastName = $customerInfo['lastName'];
        $this->address1 = $customerInfo['address1'];
        $this->address2 = $customerInfo['address2'];
        $this->city = $customerInfo['city'];
        $this->state = $customerInfo['state'];
        $this->zipcode = $customerInfo['zipcode'];
    }
    
    public function getKey() {
        return $this->key;
    }
    
    public function getFirstName() {
        return $this->firstName;
    }
    
    public function getLastName() {
        return $this->lastName;
    }
     
    public function getAddress1() {
        return $this->address1;
    }
    
    public function getAddress2() {
        return $this->address2;
    }
    
    public function getCity() {
        return $this->city;
    }
    
    public function getState() {
        return $this->state;
    }
    
    public function getZipcode() {
        return $this->zipcode;
    }
}
?>
