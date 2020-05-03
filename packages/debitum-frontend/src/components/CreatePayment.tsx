import axios from 'axios';
import moment from 'moment';
import { isRepeatable } from 'debitum-utils';
import { DATE_FORMAT } from 'debitum-constants';
import * as i from 'debitum-data/dist/interfaces';
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

const CreatePayment: React.FunctionComponent = () => {

  const { id } = useParams();

  const [payment, setPayment] = useState<i.Payment>({
    title: '',
    amount: 0,
    repeatInterval: null,
    repeatDesignator: null,
    dueDate: moment().format(DATE_FORMAT),
  });

  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [repeat, setRepeat] = useState(isRepeatable(payment));

  const loadPayment = async (): Promise<any> => {
    setIsLoading(true);
    try {
      const { data: payment } = await axios.get(`/payments/${id}`);
      setPayment(payment);
    } catch (err) {
      setError('Failed to load the payment');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadPayment();
    }
  }, []);

  useEffect(() => {
    if (repeat && !isRepeatable(payment)) {
      setPayment((p: i.Payment) => Object.assign({}, p, {
        repeatInterval: 1,
        repeatDesignator: 'weeks',
      }));
    }
  }, [repeat]);

  const setPaymentProperty = (property: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    let value: string | number | Date;

    switch (property) {
      case 'amount':
        value = (+e.target.value) * 100;
        break;
      case 'dueDate':
        value = moment.utc(e.target.value).format(DATE_FORMAT);
        break;
      case 'repeatInterval':
        value = +e.target.value;
        break;
      default:
        value = e.target.value;
    }

    setPayment(Object.assign({}, payment, {[property]: value}));
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let doRedirect = false;

    setIsSaving(true);
    setError(null);

    try {
      await axios.post('/payments', { payment });
      doRedirect = true;
    } catch(err) {
      setError('Failed to save the payment');
    } finally {
      setIsSaving(false);
      doRedirect && setRedirect(true);
    }
  };

  const renderErrorMessage = (): JSX.Element | null => {
    if (!error) {
      return null;
    }

    return <div>{error}</div>;
  };

  if (redirect) {
    return <Redirect to='/payments' />
  }

  if (isLoading) {
    return <div>Loading payment information...</div>;
  }

  return (
    <form onSubmit={save}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={payment.title} onChange={setPaymentProperty('title')}/>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        $<input id="amount" type="number" value={payment.amount / 100} onChange={setPaymentProperty('amount')}/>
      </div>

      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input type="date" value={payment.dueDate} onChange={setPaymentProperty('dueDate')} />
      </div>

      <div>
        <label>
          Repeat
          <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(!repeat)} />
        </label>
      </div>

      {repeat && (
        <div>
          <label>Every</label>
          <input type="number" min="1" value={payment.repeatInterval || ''} onChange={setPaymentProperty('repeatInterval')} />
          <select value={payment.repeatDesignator || ''} onChange={setPaymentProperty('repeatDesignator')}> 
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      )}

      {renderErrorMessage()}

      <div>
        <button type="submit" disabled={isSaving}>Save</button>
      </div>
    </form>
  );
};

export default CreatePayment;
