// // import React, { useEffect, useState } from "react";
// // import { Map, MapMarker } from "react-kakao-maps-sdk";

// // export default function KakaoMap() {
// //   const [info, setInfo] = useState();
// //   const [markers, setMarkers] = useState([]);
// //   const [map, setMap] = useState();
// //   const { kakao } = window;

// //   useEffect(() => {
// //     if (!map) return;
// //     const ps = new kakao.maps.services.Places();

// //     ps.keywordSearch("이태원 맛집", (data, status, _pagination) => {
// //       if (status === kakao.maps.services.Status.OK) {
// //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
// //         // LatLngBounds 객체에 좌표를 추가합니다
// //         const bounds = new kakao.maps.LatLngBounds();
// //         let markers = [];

// //         for (var i = 0; i < data.length; i++) {
// //           // @ts-ignore
// //           markers.push({
// //             position: {
// //               lat: data[i].y,
// //               lng: data[i].x,
// //             },
// //             content: data[i].place_name,
// //           });
// //           // @ts-ignore
// //           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
// //         }
// //         setMarkers(markers);

// //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
// //         map.setBounds(bounds);
// //       }
// //     });
// //   }, [map]);

// //   return (
// //     <Map // 로드뷰를 표시할 Container
// //       center={{
// //         lat: 37.566826,
// //         lng: 126.9786567,
// //       }}
// //       style={{
// //         width: "100%",
// //         height: "100%",
// //       }}
// //       level={3}
// //       onCreate={setMap}
// //     >
// //       {markers.map((marker) => (
// //         <MapMarker
// //           key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
// //           position={marker.position}
// //           onClick={() => setInfo(marker)}
// //         >
// //           {info && info.content === marker.content && (
// //             <div style={{ color: "#000" }}>{marker.content}</div>
// //           )}
// //         </MapMarker>
// //       ))}
// //     </Map>
// //   );
// // }

// //====================================================================================================

// import React, { useEffect, useState } from "react";
// import { Scheduler } from "@aldabil/react-scheduler";
// import { configure } from "@testing-library/react";
// import type {
//   ProcessedEvent,
//   SchedulerHelpers,
// } from "@aldabil/react-scheduler/types";
// import {
//   TextField,
//   Button,
//   DialogActions,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   ToggleButtonGroup,
//   ToggleButton,
//   Divider,
// } from "@mui/material";
// import DatePicker from "./DatePicker";
// import MapSeach from "./MapSeach";
// import CloseIcon from "@mui/icons-material/Close";

// // 커스텀 코드
// interface CustomEditorProps {
//   scheduler: SchedulerHelpers;
// }
// const CustomEditor = ({ scheduler }: CustomEditorProps) => {
//   const event = scheduler.edited;

//   const [eventList, setEventList] = useState([]);

//   console.log(eventList);

//   // Make your own form/state
//   const [state, setState] = useState({
//     category: event?.category || "",
//     title: event?.title || "",
//     // start: event?.start || "",
//     // end: event?.end || "",
//     locale: event?.locale || "",
//     description: event?.description || "",
//     reminder: event?.reminder || "",
//     reminderMethod: event?.reminderMethod || "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (value: any, name: string) => {
//     setState((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };
//   const handleSubmit = async (e) => {
//     // Your own validation
//     if (state.title.length < 3) {
//       return setError("Min 3 letters");
//     }

//     // console.log(e);

//     try {
//       scheduler.loading(true);

//       /**Simulate remote data saving */
//       const added_updated_event = (await new Promise((res) => {
//         /**
//          * Make sure the event have 4 mandatory fields
//          * event_id: string|number
//          * title: string
//          * start: Date|string
//          * end: Date|string
//          */

//         setTimeout(() => {
//           res({
//             event_id: event?.event_id || Math.random(),
//             category: state.category,
//             title: state.title,
//             /**
//              * 잊기전에 메모
//              * 커스텀 과정이 다소 조잡하다. 더 바람직한 방향이 있을 수도 있겠다. 하지만 잘 작동한다.
//              * scheduler객체에는 클릭한 날짜(셀)의 날짜값과 기타 함수들을 가지고 있다.
//              * 해당 날짜값으로 start,end 날짜값이 초기화되고, 시간만 start는 09시, end는 17시로 할당된다.
//              * 사용자가 모달안에 들어가서 날짜를 수정하게되면, 이 초기값이 나는 새로운 상태값을 사용해야하므로
//              * 아래와 삼항연산자와 같이 새로운 스테이트 값이 감지되면, 그 값으로 대체된다.
//              */

//             start: state.start ? state.start : scheduler.state.start.value,
//             end: state.end ? state.end : scheduler.state.end.value,
//             description: state.description,
//             reminder: state.reminder,
//             reminderMethod: state.reminderMethod,
//             color: "#c1c1c1",
//           });
//         }, 3000);
//       })) as ProcessedEvent;

//       scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
//       if (e.target.textContent === "저장 후 계속") {
//         setEventList((prev) => ({ ...prev, state }));
//         handleReset();
//       } else {
//         setEventList((prev) => ({ ...prev, state }));
//         scheduler.close();
//       }
//     } finally {
//       scheduler.loading(false);
//     }
//   };

//   //내코드
//   const [reset, setReset] = useState(false);
//   const triggerReset = () => {
//     setReset((prev) => !prev);
//   };

//   const handleReset = () => {
//     triggerReset();
//     setState({
//       category: "",
//       title: "",
//       // start: "",
//       // end: "",
//       start: scheduler.state.start.value,
//       end: scheduler.state.end.value,
//       locale: "",
//       description: "",
//       reminder: "",
//       reminderMethod: "",
//     });
//   };

//   const handleClose = () => {
//     let result = window.confirm(
//       "아직 저장되지 않은 항목이 있습니다. 그래도 나가시겠습니까?"
//     );
//     if (result) {
//       scheduler.close();
//       handleReset(); // 안해도 초기화 되긴하는데 혹시 몰라서 호출
//     }
//   };

//   // console.log(state);

//   const [selectedMarker, setSelectedMaker] = React.useState({
//     content: "",
//     position: {
//       lat: "",
//       lng: "",
//     },
//   });

//   useEffect(() => {
//     setState((prev) => ({ ...prev, locale: selectedMarker.content }));
//   }, [selectedMarker]);

//   return (
//     <div>
//       <div style={{ padding: "3rem" }}>
//         <Grid container spacing={2}>
//           {/* 상단제목 */}
//           <Grid item xs={12} display='flex' justifyContent='space-between'>
//             <Typography
//               variant='h5'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//             >
//               Add New Event
//             </Typography>
//             <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
//           </Grid>
//           {/* 상단각주 */}
//           <Grid item xs={12} textAlign='right'>
//             <Divider />
//             <Typography variant='caption' color='primary'>
//               * : 필수 입력 사항
//             </Typography>
//           </Grid>

//           {/* 범주 제목 */}
//           <Grid item xs={1}>
//             <Typography
//               id='groupLabel'
//               variant='subtitle1'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//               textAlign='right'
//             >
//               *범주
//             </Typography>
//           </Grid>

//           {/* 범주 내용 */}
//           <Grid item xs={11}>
//             <FormControl fullWidth>
//               <InputLabel id='demo-simple-select-label'>Category</InputLabel>
//               <Select
//                 labelId='demo-simple-select-label'
//                 id='demo-simple-select'
//                 value={state.category}
//                 onChange={(e) => handleChange(e.target.value, "category")}
//                 name='groupLabel'
//                 required
//                 label='Category'
//               >
//                 {/* 추후 맵으로 리팩토링 예정 */}
//                 <MenuItem value={"회사"}>회사</MenuItem>
//                 <MenuItem value={"프로젝트"}>프로젝트</MenuItem>
//                 <MenuItem value={"개인"}>개인</MenuItem>
//                 <MenuItem value={"가족"}>가족</MenuItem>
//                 <MenuItem value={"친구"}>친구</MenuItem>
//                 <MenuItem value={"생일"}>생일</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* 제목 제목 ㅋㅋ */}
//           <Grid item xs={1}>
//             <Typography
//               id='modal-modal-title'
//               variant='subtitle1'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//               textAlign='right'
//             >
//               *제목
//             </Typography>
//           </Grid>

//           {/* 제목 내용 */}
//           <Grid item xs={11}>
//             <TextField
//               id='outlined-basic'
//               label='Title'
//               variant='outlined'
//               fullWidth
//               name='label'
//               value={state.title}
//               onChange={(e) => handleChange(e.target.value, "title")}
//               error={!!error}
//               helperText={error}
//             />
//           </Grid>

//           {/* 일시 제목 */}
//           <Grid item xs={1}>
//             <Typography
//               id='modal-modal-title'
//               variant='subtitle1'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//               textAlign='right'
//             >
//               *일시
//             </Typography>
//           </Grid>

//           {/* 일시 내용 추후 수정*/}
//           <Grid
//             item
//             xs={11}
//             display='flex'
//             justifyContent='center'
//             alignItems='center'
//           >
//             <DatePicker
//               onChange={handleChange}
//               scheduler={scheduler}
//               doReset={reset}
//             />
//           </Grid>

//           {/* 장소 제목 */}
//           <Grid item xs={1}>
//             <Typography
//               id='modal-modal-title'
//               variant='subtitle1'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//               textAlign='right'
//             >
//               장소
//             </Typography>
//           </Grid>

//           {/* 장소 내용 */}
//           <Grid item xs={9}>
//             <TextField
//               id='outlined-basic'
//               label='Locale'
//               variant='outlined'
//               fullWidth
//               value={state.locale}
//               onChange={(e) => handleChange(e.target.value, "locale")}
//               name='locale'
//               // readOnly
//             />
//           </Grid>
//           <Grid item xs={2} margin='auto'>
//             {/* 장소 버튼 */}
//             <MapSeach
//               selectedMarker={selectedMarker}
//               setSelectedMaker={setSelectedMaker}
//             />
//           </Grid>

//           {/* 설명 제목 */}
//           <Grid item xs={1}>
//             <Typography
//               id='modal-modal-title'
//               variant='subtitle1'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//               textAlign='right'
//             >
//               설명
//             </Typography>
//           </Grid>

//           {/* 설명 내용 */}
//           <Grid item xs={11}>
//             <TextField
//               id='outlined-multiline-static'
//               label='Decription'
//               multiline
//               rows={4}
//               fullWidth
//               name='description'
//               value={state.description}
//               onChange={(e) => handleChange(e.target.value, "description")}
//             />
//           </Grid>

//           {/* 알림 제목 */}
//           <Grid item xs={1}>
//             <Typography
//               id='modal-modal-title'
//               variant='subtitle1'
//               component='h2'
//               color='primary'
//               fontWeight={700}
//               textAlign='right'
//             >
//               알림
//             </Typography>
//           </Grid>

//           {/* 알림 내용 */}
//           <Grid item xs={6}>
//             <FormControl fullWidth>
//               <InputLabel id='demo-simple-select-label'>Reminder</InputLabel>
//               <Select
//                 labelId='demo-simple-select-label'
//                 id='demo-simple-select'
//                 label='Reminder'
//                 value={state.reminder}
//                 onChange={(e) => {
//                   handleChange(e.target.value, "reminder");
//                   e.target.value === 123 && handleChange("", "reminderMethod");
//                 }}
//                 name='reminderTime'
//               >
//                 {/* 추후 맵으로 리팩토링 예정 */}
//                 {/* <MenuItem value={10}>직접 입력</MenuItem> */}
//                 <MenuItem value={123}>사용안함</MenuItem>
//                 <MenuItem value={0}>정시</MenuItem>
//                 <MenuItem value={300}>5분 전</MenuItem>
//                 <MenuItem value={600}>10분 전</MenuItem>
//                 <MenuItem value={900}>15분 전</MenuItem>
//                 <MenuItem value={1800}>30분 전</MenuItem>
//                 <MenuItem value={3600}>1시간 전</MenuItem>
//                 <MenuItem value={7200}>2시간 전</MenuItem>
//                 <MenuItem value={10800}>3시간 전</MenuItem>
//                 <MenuItem value={43200}>12시간 전</MenuItem>
//                 <MenuItem value={86400}>1일(24시간) 전</MenuItem>
//                 <MenuItem value={172800}>2일(48시간) 전</MenuItem>
//                 <MenuItem value={604800}>1주일(168시간) 전</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* 알림 버튼 */}
//           <Grid item xs={5} margin='auto'>
//             <ToggleButtonGroup
//               color='primary'
//               value={state.reminderMethod}
//               exclusive
//               aria-label='Platform'
//               disabled={
//                 state.reminder === 123 || state.reminder === "" ? true : false
//               }
//               onChange={(e) => handleChange(e.target.value, "reminderMethod")}
//             >
//               <ToggleButton value='popup'>팝업</ToggleButton>
//               <ToggleButton value='mail'>메일</ToggleButton>
//               <ToggleButton value='kakao'>카카오톡 알림</ToggleButton>
//             </ToggleButtonGroup>
//           </Grid>
//           {/* 초기화 버튼 */}
//           <Grid
//             item
//             xs={12}
//             display='flex'
//             justifyContent='center'
//             marginTop='40px'
//           >
//             <Button variant='outlined' onClick={handleReset}>
//               초기화
//             </Button>
//           </Grid>
//           {/* 저장후 계속 버튼*/}
//           {event ? (
//             <Grid
//               item
//               xs={12}
//               // display='flex'
//               // justifyContent='center'
//               marginTop='20px'
//             >
//               <Button
//                 variant='contained'
//                 fullWidth
//                 // onClick={handleSaveClose}
//                 size='large'
//                 sx={{ marginX: "10px" }}
//                 onClick={(e) => {
//                   handleSubmit(e);
//                 }}
//                 disabled={
//                   state.category === "" || state.title === "" ? true : false
//                 }
//               >
//                 수정 완료
//               </Button>
//             </Grid>
//           ) : (
//             <>
//               <Grid item xs={9} display='flex' marginTop='20px'>
//                 <Button
//                   variant='contained'
//                   sx={{ marginX: "10px" }}
//                   size='large'
//                   disabled={
//                     state.category === "" || state.title === "" ? true : false
//                   }
//                   fullWidth
//                   onClick={(e) => {
//                     handleSubmit(e);
//                   }}
//                 >
//                   저장 후 계속
//                 </Button>
//               </Grid>

//               <Grid
//                 item
//                 xs={3}
//                 // display='flex'
//                 // justifyContent='center'
//                 marginTop='20px'
//               >
//                 <Button
//                   variant='contained'
//                   fullWidth
//                   // onClick={handleSaveClose}
//                   size='large'
//                   sx={{ marginX: "10px" }}
//                   onClick={(e) => {
//                     handleSubmit(e);
//                   }}
//                   disabled={
//                     state.category === "" || state.title === "" ? true : false
//                   }
//                 >
//                   저장 후 닫기
//                 </Button>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </div>
//     </div>
//   );
// };
// // 커스텀 코드 여기까지

// export default function TestNew() {
//   return (
//     <Scheduler
//       // 후 커스텀 개자식
//       customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
//       viewerExtraComponent={(fields, event) => {
//         return (
//           <div>
//             <p>범주 : {event.category || "내용 없음"}</p>
//             <p>장소 : {event.locale || "장소 정보 없음"}</p>
//             <p>설명 : {event.description || "설명 없음"}</p>
//             <p>
//               알림 :{" "}
//               {(() => {
//                 switch (event.reminder) {
//                   case 0:
//                     return "정시알림";
//                   case 300:
//                     return "5분 전";
//                   case 600:
//                     return "10분 전";
//                   case 900:
//                     return "15분 전";
//                   case 1800:
//                     return "30분 전";
//                   case 3600:
//                     return "1시간 전";
//                   case 7200:
//                     return "2시간 전";
//                   case 10800:
//                     return "3시간 전";
//                   case 43200:
//                     return "12시간 전";
//                   case 86400:
//                     return "1일(24시간) 전";
//                   case 172800:
//                     return "2일(48시간) 전";
//                   case 604800:
//                     return "1주일(168시간) 전";
//                   default:
//                     return "알림 사용 안함";
//                 }
//               })()}
//             </p>
//             <p>알림방법: {event.reminderMethod || "알림 사용하지 않음"}</p>
//           </div>
//         );
//       }}
//       // 여까지 커스텀
//       height={800}
//       view='month'
//       month={{
//         weekDays: [0, 1, 2, 3, 4, 5, 6], // 요일을 뭐뭐 사용할지.
//         weekStartOn: 0, // 어떤 요일로 시작할지 (0이 일요일이더라)
//         startHour: 9, // 시작 시간 초기값 시간
//         endHour: 17, // 끝 초기값 시간
//         // cellRenderer: (props: CellProps) => JSX.Element,
//         navigation: true, // ?
//         disableGoToDay: true, // 월별달력 날짜 누르면해당 날 자세히 보기
//       }}
//       draggable={false}
//       // disableViewNavigator={true}
//       events={[
//         {
//           event_id: 1,
//           title: "Event 1",
//           start: new Date("2021/5/2 09:30"),
//           end: new Date("2021/5/2 10:30"),
//           // allDay: true,
//         },
//         {
//           event_id: 2,
//           title: "Event 2",
//           start: new Date("2021/5/4 10:00"),
//           end: new Date("2021/5/4 11:00"),
//         },
//         {
//           event_id: 3,
//           title: "Event 2",
//           start: new Date("2021/5/4 10:00"),
//           end: new Date("2021/5/4 11:00"),
//         },
//       ]}
//       translations={{
//         // 각종 글자들 변경 시켜줌
//         navigation: {
//           month: "Month",
//           week: "Week",
//           day: "Day",
//           today: "Today",
//         },
//         form: {
//           addTitle: "Add Event",
//           editTitle: "Edit Event",
//           confirm: "Confirm",
//           delete: "Delete",
//           cancel: "Cancel",
//         },
//         event: {
//           title: "Title",
//           start: "Start",
//           end: "End",
//           allDay: "All Day",
//         },
//         moreEvents: "More...",
//         loading: "Loading...",
//       }}
//     />
//   );
// }
