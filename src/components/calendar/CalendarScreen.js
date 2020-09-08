import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActive, startListEvents } from '../../actions/calendar';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const {uid} = useSelector(state => state.auth)

	const [lastview, setLastview] = useState(localStorage.getItem('lastView') || 'month');

	useEffect(() => {

		
		dispatch(startListEvents())
		// eslint-disable-next-line
	}, [])



	const onViewChange = (e) => {
		setLastview(e);
		localStorage.setItem('lastView', e);
	};

	const onDoubleClick = () => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onSelectSlot = (e) => {
		dispatch(eventClearActive());
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: ( uid === event.user._id ) ? '#367cf7' : '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};

		return {
			style,
		};
	};

	return (
		<div>
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onSelectSlot={onSelectSlot}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				selectable={true}
				view={lastview}
				style={{ height: 500 }}
			/>

			<AddNewFab />
			{activeEvent && <DeleteEventFab />}
			<CalendarModal />
		</div>
	);
};

export default CalendarScreen;
