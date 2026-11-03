/* Ngân hàng 20 câu. correct: 0=A, 1=B, 2=C, 3=D trước khi đảo lựa chọn.
   Mỗi option có text và feedback. Giữ id không trùng khi bổ sung câu hỏi. */
window.QUIZ_SOURCES = [
 {id:'escape',name:'USFA · Kế hoạch và kỹ năng thoát nạn',url:'https://www.usfa.fema.gov/gallery/pictographs/escape-planning.html'},
 {id:'extinguisher',name:'OSHA · Điều kiện sử dụng bình chữa cháy',url:'https://www.osha.gov/etools/evacuation-plans-procedures/emergency-standards/portable-extinguishers/use'},
 {id:'electric',name:'EVN · Nhận biết quá tải điện',url:'https://www.evn.com.vn/d/vi-VN/news-d/Qua-tai-dien-trong-gia-dinh-Nhan-biet-som-de-phong-ngua-chay-no-60-2021-509328'},
 {id:'door',name:'FEMA · Tài liệu huấn luyện an toàn cộng đồng',url:'https://www.fema.gov/sites/default/files/2020-07/fema_cert-basic-training-instructor-guide-compiled_102815.pdf'},
 {id:'gas',name:'Bộ Công an · Phòng tránh cháy, nổ khi sử dụng bếp gas',url:'https://bocongan.gov.vn/chinh-sach-phap-luat/chi-tiet-cau-hoi/af4ad41b-17dd-423c-8d6f-bfbcbc4e9f97'},
 {id:'battery',name:'USFA · Nguy cơ và cháy trở lại của pin lithium-ion',url:'https://www.usfa.fema.gov/a-z/lithium-ion-batteries/risks-and-response-strategies/'},
 {id:'battery-handling',name:'Oregon State Fire Marshal · An toàn pin sạc',url:'https://www.oregon.gov/osfm/education/Pages/battery-safety.aspx'},
 {id:'co',name:'CDC · Khí CO và bảo vệ sức khỏe',url:'https://www.cdc.gov/niosh/carbon-monoxide/about/'},
 {id:'well',name:'Bộ Công an · Cảnh báo ngạt khí trong không gian kín',url:'https://bocongan.gov.vn/bai-viet/phong-canh-sat-pccc-va-cnch-khan-truong-cuu-nguoi-trong-vu-ngat-khi-tai-be-chua-nuoc-1784474112'},
 {id:'drowning',name:'Bệnh viện Nhi Trung ương · Không dốc ngược người đuối nước',url:'https://benhviennhitrunguong.gov.vn/gap-tre-duoi-nuoc-dung-doc-nguoc-hay-ep-tim-thoi-ngat-dung-cach.html'},
 {id:'cpr',name:'American Red Cross · Nhận biết và hồi sinh tim phổi',url:'https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps'},
 {id:'burn',name:'NHS · Sơ cứu bỏng nhiệt',url:'https://www.nhs.uk/conditions/burns-and-scalds/'},
 {id:'clothes',name:'USFA · Dừng, nằm xuống và lăn khi quần áo cháy',url:'https://www.usfa.fema.gov/gallery/pictographs/pictograph49.html'},
 {id:'firedoor',name:'London Fire Brigade · Cửa ngăn cháy',url:'https://www.london-fire.gov.uk/safety/the-home/fire-doors/'},
 {id:'ethanol',name:'NSW Government · An toàn thiết bị đốt cồn',url:'https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/other-consumer-products/ethanol-burner-safety'},
 {id:'co2',name:'University of South Carolina · Bình CO₂',url:'https://www.sc.edu/ehs/training/Fire/05_co2.htm'},
 {id:'elevator',name:'Otis Việt Nam · An toàn thang máy',url:'https://www.otis.com/vi/vn/tools-resources/elevator-safety'},
 {id:'chemical',name:'Health Canada · Sử dụng hóa chất gia dụng an toàn',url:'https://www.canada.ca/en/health-canada/services/home-safety/household-chemical-safety.html'},
 {id:'flood',name:'NOAA · Nguy cơ khi đi qua đường ngập',url:'https://www.noaa.gov/jetstream/thunderstorms/flood'},
 {id:'spine',name:'American Red Cross · Chấn thương xương, khớp và cột sống',url:'https://www.redcross.org/take-a-class/resources/learn-first-aid/muscle-bone-joint-injury'},
 {id:'choking',name:'American Red Cross · Hóc dị vật ở người lớn và trẻ em',url:'https://www.redcross.org/take-a-class/resources/learn-first-aid/adult-child-choking'}
];
window.QUIZ_QUESTIONS = [
{id:1,deck:1,topic:'Thoát nạn',title:'Hai nơi trú, chọn nơi nào?',prompt:'Cháy ở tầng dưới, mọi đường xuống đều bị khói dày chặn. Ở tầng 3, em tiếp cận an toàn được phòng A là nhà vệ sinh không cửa sổ, có nước; phòng B chưa có khói, cửa đóng được và có cửa sổ nhìn ra đường. Em nên làm gì?',hint:'So sánh khả năng ngăn khói và báo vị trí, thay vì chỉ xem nơi nào có nhiều nước.',sources:['escape'],correct:1,options:[
 {text:'Vào phòng A, mở vòi nước rồi chờ vì nước sẽ ngăn khí độc.',feedback:'Nước trong phòng không ngăn khí độc hoặc bổ sung ôxy; phòng không cửa sổ hạn chế khả năng báo vị trí.'},
 {text:'Vào phòng B, đóng cửa ngăn khói, gọi 114 và ra hiệu an toàn.',feedback:'Phòng còn an toàn, cửa ngăn khói và cửa sổ báo vị trí tạo điều kiện chờ cứu nạn. Chèn khe cửa nếu làm được, không nhảy xuống.'},
 {text:'Lấy khăn ướt rồi chạy xuống vì chỉ đứng lâu trong khói mới nguy hiểm.',feedback:'Khói dày có thể nhanh chóng gây mất khả năng thoát; khăn ướt không bảo vệ trước khí độc và thiếu ôxy.'},
 {text:'Vào phòng B, mở cả cửa phòng và cửa sổ cho gió xuyên phòng.',feedback:'Mở cửa phòng về phía có khói tạo đường cho khói, nhiệt xâm nhập. Cần đóng cửa ngăn cách khu vực nguy hiểm.'}]},
{id:2,deck:1,topic:'Chữa cháy ban đầu',title:'Có bình nhưng chưa đủ an toàn',prompt:'Một thùng giấy cháy nhỏ. Em đã được huấn luyện, có bình phù hợp. Nhưng muốn đến vị trí phun, em phải đi qua đám cháy, khiến lửa nằm giữa em và cửa ra duy nhất. Em nên làm gì?',hint:'Nếu lần phun đầu không dập được lửa, em còn đường rút an toàn không?',sources:['extinguisher'],correct:3,options:[
 {text:'Tiếp cận vì đám cháy nhỏ và đã có đúng loại bình.',feedback:'Đám cháy nhỏ và bình phù hợp chưa đủ an toàn nếu đường rút lui bị đe dọa.'},
 {text:'Tiếp cận nếu có một bạn đứng ở cửa quan sát.',feedback:'Người quan sát không loại bỏ nguy cơ lửa, nhiệt hoặc khói cắt đường thoát.'},
 {text:'Tiếp cận và chỉ rút khi bình đã phun hết.',feedback:'Chờ hết bình có thể làm mất thời điểm rút lui. Phải đánh giá đường thoát trước khi tiếp cận.'},
 {text:'Không tiếp cận; cảnh báo, báo cháy và rời theo lối an toàn.',feedback:'Không để lửa, nhiệt hoặc khói nằm giữa mình và lối thoát khi chữa cháy ban đầu.'}]},
{id:3,deck:1,topic:'An toàn điện',title:'Aptomat chưa nhảy: đã an toàn?',prompt:'Ổ cắm kéo dài ghi tổng tải tối đa 10 A, nguồn 220 V. Hai thiết bị thuần trở 1.500 W và 1.000 W cùng chạy qua ổ. Aptomat phía trước 20 A chưa ngắt. Nhận định nào đúng?',hint:'Tính tổng công suất rồi dùng I = P/U; so với giới hạn của chính ổ cắm.',sources:['electric'],correct:2,options:[
 {text:'Dòng khoảng 6,82 A; chỉ tính thiết bị lớn hơn.',feedback:'Cả hai thiết bị cùng hoạt động nên phải cộng công suất.'},
 {text:'Dòng khoảng 11,36 A; an toàn vì chưa vượt 20 A.',feedback:'Giới hạn 20 A của aptomat không thay thế giới hạn 10 A của ổ cắm.'},
 {text:'Dòng khoảng 11,36 A; ổ quá tải dù aptomat chưa ngắt.',feedback:'2.500 W / 220 V ≈ 11,36 A, vượt mức 10 A của ổ. Cần giảm tải, bố trí nguồn phù hợp; không tăng aptomat để tránh ngắt.'},
 {text:'Dòng khoảng 4,55 A; hai thiết bị chia tải cho nhau.',feedback:'Dòng qua ổ chung tương ứng tổng công suất, không phải hiệu công suất.'}]},
{id:4,deck:1,topic:'Thoát nạn',title:'Mở cửa để thoát khói?',prompt:'Khói thoát qua khe trên của một cửa phòng đang đóng, nghi có cháy bên trong. Một bạn định mở rộng cửa để thoát khói và quan sát. Em chọn cách nào?',hint:'Điều gì thay đổi khi không khí bên ngoài tràn vào phòng đang cháy?',sources:['door'],correct:0,options:[
 {text:'Giữ cửa đóng, cảnh báo, báo cháy và rời khu vực an toàn.',feedback:'Mở cửa có thể cấp thêm ôxy và tạo đường lan khói, nhiệt. Không tự mở để kiểm tra.'},
 {text:'Mở rộng cửa rồi đứng sát bên để quan sát.',feedback:'Đứng sát cửa có thể khiến người mở tiếp xúc với khói, nhiệt và cháy phát triển đột ngột.'},
 {text:'Mở cửa nếu có khăn ướt và một bạn hỗ trợ phía sau.',feedback:'Khăn ướt và người hỗ trợ không ngăn được cháy phát triển hoặc khí độc tràn ra.'},
 {text:'Mở vài phút cho hết khói rồi mới gọi hỗ trợ.',feedback:'Mở cửa có thể làm cháy phát triển, đồng thời trì hoãn báo động và thoát nạn.'}]},
{id:5,deck:1,topic:'Điện & hóa chất',title:'Ba thao tác tưởng là an toàn',prompt:'Trong bếp có mùi gas nồng. Một bạn định tắt đèn, bật quạt hút rồi đứng cạnh bình gas gọi điện. Phương án thay thế nào phù hợp nhất?',hint:'Cả đóng lẫn ngắt mạch điện đều có thể tạo tia lửa tại tiếp điểm.',sources:['gas'],correct:3,options:[
 {text:'Tắt đèn, giữ quạt tắt rồi gọi ngay cạnh bình gas.',feedback:'Tắt đèn có thể phát sinh tia lửa; cần gọi điện từ ngoài vùng rò rỉ.'},
 {text:'Bật quạt, mở cửa rồi dùng bật lửa tìm chỗ rò.',feedback:'Bật quạt có thể sinh tia lửa; dùng lửa kiểm tra gas có thể gây cháy, nổ.'},
 {text:'Rút phích cắm các thiết bị rồi ở lại tìm chỗ rò.',feedback:'Rút phích cắm cũng có thể sinh tia lửa. Không ở lại dò tìm khi chưa bảo đảm an toàn.'},
 {text:'Tránh thao tác điện, cảnh báo và ra ngoài gọi hỗ trợ.',feedback:'Tránh nguồn gây cháy và gọi hỗ trợ từ nơi an toàn. Chỉ khóa van, mở cửa thông thoáng khi tiếp cận được an toàn.'}]},
{id:6,deck:1,topic:'Chữa cháy ban đầu',title:'Hết lửa chưa phải hết nguy hiểm',prompt:'Pin xe điện vừa được phun chữa cháy, hết ngọn lửa nhưng vẫn nóng và lách tách. Trời sắp mưa, có người định mang pin vào kho. Em nên làm gì?',hint:'Phân biệt không nhìn thấy ngọn lửa với phản ứng bên trong pin đã chấm dứt.',sources:['battery','battery-handling'],correct:1,options:[
 {text:'Đeo găng vải rồi chuyển vì lửa đã được dập.',feedback:'Găng vải không bảo vệ trước pin phản ứng, phun vật chất nóng hoặc cháy lại.'},
 {text:'Ngăn tiếp cận, giữ khoảng cách và để chuyên môn xử lý.',feedback:'Pin nóng, có tiếng bất thường có thể tiếp tục phản ứng và cháy lại. Không tự cầm, tháo hoặc vận chuyển.'},
 {text:'Bọc pin bằng chăn rồi mang vào kho tránh mưa.',feedback:'Bọc và di chuyển khiến người xử lý ở gần pin chưa an toàn, có thể đưa nguy cơ cháy vào kho.'},
 {text:'Chờ hết tiếng động rồi tháo vỏ kiểm tra các cell.',feedback:'Hết tiếng động chưa chứng minh pin an toàn; tự tháo pin hỏng có thể gây thêm sự cố.'}]},
{id:7,deck:1,topic:'Cứu hộ an toàn',title:'Nguy cơ không màu, không mùi',prompt:'Máy phát điện chạy trong gian để xe liền phòng sinh hoạt, cửa mở hé. Nhiều người cùng đau đầu, chóng mặt, buồn nôn nhưng không thấy khói rõ. Nhận định và hành động nào phù hợp nhất?',hint:'Có loại khí nguy hiểm không thể phát hiện bằng màu sắc hoặc mùi.',sources:['co'],correct:2,options:[
 {text:'Nghi thiếu ngủ; cho mọi người nằm nghỉ tại phòng.',feedback:'Nhiều người cùng có triệu chứng khi máy phát chạy gần phòng phải nghĩ đến phơi nhiễm khí thải nguy hiểm.'},
 {text:'Nghi khí độc; mở rộng cửa rồi tiếp tục sinh hoạt.',feedback:'Mở cửa không làm máy phát chạy trong nhà hoặc không gian bán kín trở nên an toàn.'},
 {text:'Nghi CO; ra không khí trong lành nếu an toàn, gọi cấp cứu.',feedback:'CO trong khí thải động cơ không màu, không mùi. Đau đầu, chóng mặt, buồn nôn có thể là ngộ độc; không tự quay vào vùng nghi nhiễm khí.'},
 {text:'Nghi khói; phát khẩu trang y tế để tiếp tục sinh hoạt.',feedback:'Khẩu trang y tế không bảo vệ khỏi CO; ở lại có thể khiến ngộ độc nặng hơn.'}]},
{id:8,deck:1,topic:'Cứu hộ an toàn',title:'Dây cứu hộ có bảo vệ hô hấp?',prompt:'Một người xuống giếng rồi bất tỉnh; người thứ hai xuống cứu cũng lịm dần. Một bạn định buộc dây, bịt khăn ướt rồi xuống để mọi người kéo lên khi cần. Nhận định nào đúng nhất?',hint:'Phương tiện chống rơi có đồng thời là phương tiện bảo vệ hô hấp không?',sources:['well'],correct:0,options:[
 {text:'Không xuống; dây và khăn không khắc phục khí độc, thiếu ôxy.',feedback:'Dây không bảo vệ hô hấp, khăn không cấp ôxy. Gọi 114, 115, ngăn người khác xuống theo và báo rõ hiện trường.'},
 {text:'Có thể xuống nếu ba người khỏe mạnh giữ dây phía trên.',feedback:'Số người giữ dây không làm môi trường dưới giếng an toàn để thở.'},
 {text:'Có thể xuống nếu miệng giếng không có mùi lạ.',feedback:'Không mùi không loại trừ khí độc hoặc thiếu ôxy; môi trường dưới sâu có thể khác miệng giếng.'},
 {text:'Có thể xuống nếu nín thở và cam kết quay lên nhanh.',feedback:'Nín thở không phải biện pháp bảo vệ khi cứu nạn; sự cố bất ngờ có thể làm người cứu mất khả năng tự thoát.'}]},
{id:9,deck:1,topic:'Sơ cứu',title:'Không chậm trễ để “dốc nước”',prompt:'Một học sinh được đưa khỏi nước tới nơi an toàn, không đáp ứng, không thở bình thường. Nhóm có người đã học hồi sinh tim phổi. Cách xử lý phù hợp nhất?',hint:'Việc cố đổ nước ra có giải quyết được nguy cơ thiếu ôxy đang diễn ra không?',sources:['drowning','cpr'],correct:3,options:[
 {text:'Vác chạy cho nước ra rồi mới hồi sinh tim phổi.',feedback:'Vác chạy, dốc ngược làm chậm hồi sinh tim phổi và mất thời gian cấp cứu quan trọng.'},
 {text:'Ấn bụng nhiều lần cho hết nước rồi kiểm tra thở.',feedback:'Không trì hoãn hồi sinh tim phổi để cố đẩy nước ra bằng ấn bụng.'},
 {text:'Chờ xe vì thổi ngạt có thể đẩy nước sâu hơn.',feedback:'Không đáp ứng và không thở bình thường cần được cấp cứu ngay; chờ đợi làm giảm cơ hội sống.'},
 {text:'Gọi 115, lấy AED nếu có; hồi sinh tim phổi theo huấn luyện.',feedback:'Bắt đầu ngay, phối hợp ép tim và thổi ngạt theo kỹ năng đã học hoặc hướng dẫn tổng đài. Hỗ trợ hô hấp đặc biệt quan trọng trong đuối nước.'}]},
{id:10,deck:1,topic:'Sơ cứu',title:'Người kêu to nhất có nặng nhất?',prompt:'Tại điểm tập kết an toàn, A tỉnh, ho và kêu khó chịu; B bất động, gọi không đáp ứng, chỉ thở ngáp rời rạc. Có hai học sinh hỗ trợ, một em đã học hồi sinh tim phổi. Nên phân công thế nào?',hint:'Thở ngáp rời rạc ở người không đáp ứng có phải thở bình thường không?',sources:['cpr'],correct:1,options:[
 {text:'Cả hai chăm A trước; B vẫn thở nên để chờ.',feedback:'Mức độ kêu cứu không phản ánh đầy đủ nguy kịch; thở ngáp không phải thở bình thường.'},
 {text:'Người đã học cấp cứu B; người kia gọi 115 và huy động hỗ trợ.',feedback:'B nghi ngừng tuần hoàn, cần hồi sinh tim phổi ngay. Người kia gọi 115, nhờ lấy AED và báo cả tình trạng A để được hỗ trợ.'},
 {text:'Một người đỡ A; người kia cho B uống nước để thử nuốt.',feedback:'Không cho người không đáp ứng uống nước vì nguy cơ sặc và làm chậm hồi sinh tim phổi.'},
 {text:'Cả hai đưa B đi tìm phòng y tế rồi đánh giá lại.',feedback:'Khi hiện trường an toàn, di chuyển đi tìm phòng y tế có thể làm chậm cấp cứu cần bắt đầu tại chỗ.'}]},
{id:11,deck:2,topic:'Sơ cứu',title:'Làm mát, không gây lạnh thêm',prompt:'Một bạn bị nước sôi đổ vào cẳng tay, có vòi nước sạch ngay cạnh. Bạn khác định chườm đá rồi bôi kem đánh răng. Sơ cứu ban đầu nào phù hợp nhất?',hint:'Phân biệt làm mát mô bỏng với gây lạnh quá mức hoặc bôi chất lên bề mặt.',sources:['burn'],correct:2,options:[
 {text:'Chườm đá trực tiếp 20 phút rồi băng thật chặt.',feedback:'Đá trực tiếp có thể gây thêm tổn thương; băng chặt không phù hợp khi vùng bỏng sưng.'},
 {text:'Bôi kem đánh răng, chờ khô rồi mới rửa nhẹ.',feedback:'Kem đánh răng không phải chất sơ cứu bỏng và không thay thế việc làm mát.'},
 {text:'Dùng nước sạch mát chảy nhẹ 20 phút, không bóc vải dính da.',feedback:'Nước mát giúp giảm nhiệt vùng bỏng. Không gỡ vải dính da hoặc chọc bóng nước; nhờ y tế đánh giá mức độ bỏng.'},
 {text:'Chờ hết nóng rồi chọc bóng nước để giảm căng.',feedback:'Chờ làm chậm làm mát; chọc bóng nước làm tăng nguy cơ nhiễm trùng.'}]},
{id:12,deck:2,topic:'Chữa cháy ban đầu',title:'Khi lửa bén vào quần áo',prompt:'Tại sân trường phẳng, không có xăng, hóa chất trên nền, áo một bạn bén lửa. Bạn hoảng sợ chạy về vòi nước cách 30 m. Không có phương tiện dập lửa ngay cạnh. Cần hướng dẫn hành động nào trước?',hint:'Việc chạy tác động thế nào tới sự cháy trên quần áo?',sources:['clothes'],correct:0,options:[
 {text:'Dừng chạy, nằm xuống, che mặt bằng tay và lăn qua lại.',feedback:'Dừng, nằm và lăn giúp dập lửa trên quần áo; dùng hai tay che mặt để bảo vệ vùng mặt.'},
 {text:'Chạy nhanh hơn tới vòi nước và vung tay cho lửa tách ra.',feedback:'Chạy có thể làm lửa lan mạnh hơn; không kéo dài quãng chạy để tìm nước.'},
 {text:'Đứng yên, giơ tay cao và chờ người tìm bình chữa cháy.',feedback:'Đứng chờ khiến quần áo tiếp tục cháy; trong điều kiện đề bài có thể dừng, nằm và lăn ngay.'},
 {text:'Tiếp tục chạy nhưng kéo phần áo cháy ra xa cơ thể.',feedback:'Tiếp tục chạy có thể làm cháy lan; giữ phần áo đang cháy còn có nguy cơ bỏng tay.'}]},
{id:13,deck:2,topic:'Thoát nạn',title:'Tiện một bước, mất một lớp bảo vệ',prompt:'Cửa ngăn cháy tự đóng ở lối vào buồng thang hoạt động bình thường. Một nhóm định chèn gạch giữ mở cả ngày cho học sinh đi lại thuận tiện. Cách nào phù hợp nhất?',hint:'Cánh cửa còn có vai trò gì ngoài phục vụ việc đi lại?',sources:['firedoor'],correct:3,options:[
 {text:'Chèn ban ngày, chỉ bỏ gạch khi học sinh về hết.',feedback:'Cháy có thể xảy ra khi đang có người; cửa mở mất tác dụng ngăn cách đúng lúc cần thiết.'},
 {text:'Chèn mở nếu gần đó có đủ bình chữa cháy.',feedback:'Bình chữa cháy không thay thế chức năng hạn chế lan khói, lửa của cửa.'},
 {text:'Tháo cơ cấu tự đóng để cửa nhẹ nhưng giữ cánh cửa.',feedback:'Tháo cơ cấu làm suy giảm chức năng bảo vệ; học sinh không tự thực hiện.'},
 {text:'Không chèn; để tự đóng và báo nhà trường nếu cửa có lỗi.',feedback:'Cửa cần đóng đúng thiết kế để hạn chế lan khói, lửa; lỗi cần người có trách nhiệm xử lý.'}]},
{id:14,deck:2,topic:'Điện & hóa chất',title:'Ngọn lửa khó nhìn thấy',prompt:'Trong hoạt động trải nghiệm có bếp cồn, ngọn lửa gần như không thấy dưới ánh sáng ban ngày nhưng bếp còn nóng. Một bạn định rót thêm cồn. Em chọn phương án nào?',hint:'Không thấy lửa có đồng nghĩa bếp đã tắt và nguội không?',sources:['ethanol'],correct:1,options:[
 {text:'Rót thật chậm vì chỉ rót nhanh mới gây bùng cháy.',feedback:'Rót chậm không loại bỏ nguy cơ hơi cồn bắt cháy khi bếp còn lửa hoặc nóng.'},
 {text:'Ngăn tiếp cồn; để người phụ trách làm đúng hướng dẫn khi bếp tắt, nguội.',feedback:'Lửa cồn khó nhìn thấy; tiếp nhiên liệu khi còn lửa hoặc bếp nóng có thể gây bùng cháy nghiêm trọng.'},
 {text:'Đưa chai sát miệng bếp để không bị đổ ra ngoài.',feedback:'Đưa chai sát bếp nóng hoặc còn lửa làm tăng nguy cơ cháy lan tới nhiên liệu trong chai.'},
 {text:'Quạt tay qua miệng bếp, không nóng rát thì rót.',feedback:'Cảm giác khi quạt tay không xác nhận bếp đã tắt và đủ nguội.'}]},
{id:15,deck:2,topic:'Chữa cháy ban đầu',title:'Một loại bình, một cách kiểm tra',prompt:'Tủ phương tiện có bình bột với đồng hồ áp suất và bình CO₂ không có đồng hồ. Một bạn nói bình CO₂ bị mất bộ phận nên đã hỏng. Nhận định nào chính xác nhất?',hint:'Thiết kế và cách kiểm tra các loại bình có thể khác nhau.',sources:['co2'],correct:2,options:[
 {text:'Chắc chắn hỏng vì mọi bình đều phải có đồng hồ.',feedback:'Không phải mọi bình đều có đồng hồ áp suất; bình CO₂ thường không có.'},
 {text:'Chắc chắn tốt nếu chốt an toàn còn nguyên.',feedback:'Chốt nguyên không chứng minh lượng chất chữa cháy và tình trạng toàn bộ bình đạt yêu cầu.'},
 {text:'Chưa kết luận hỏng; kiểm tra theo loại bình và hướng dẫn bảo dưỡng.',feedback:'Bình CO₂ thường không có đồng hồ. Đánh giá phải dựa trên cách kiểm tra phù hợp loại bình.'},
 {text:'Phun thử một ít để tự xác nhận còn đủ chất chữa cháy.',feedback:'Phun tùy tiện làm hao hụt và không xác nhận lượng chất chữa cháy còn đủ theo yêu cầu.'}]},
{id:16,deck:2,topic:'Cứu hộ an toàn',title:'Một khe cửa chưa phải lối thoát',prompt:'Thang máy dừng giữa tầng do sự cố kỹ thuật, không có cháy, khói. Cửa hé nhưng sàn cabin lệch nhiều với sàn tầng. Một bạn định trèo qua khe. Em nên làm gì?',hint:'Nhìn thấy sàn tầng qua khe có nghĩa đã có chỗ bước ra an toàn chưa?',sources:['elevator'],correct:0,options:[
 {text:'Ngăn trèo ra, báo động hoặc liên lạc cứu hộ, chờ người chuyên môn.',feedback:'Trèo ra khi cabin lệch tầng có nguy cơ rơi xuống giếng thang hoặc bị kẹp. Không cạy cửa hay tự trèo qua nóc cabin.'},
 {text:'Cho người nhẹ nhất trèo ra trước rồi kéo những người còn lại.',feedback:'Cân nặng thấp không loại trừ rơi, kẹp hoặc cabin chuyển động khi đang thoát.'},
 {text:'Cùng cạy rộng cửa để thoát trước khi có điện lại.',feedback:'Cạy cửa, tự thoát khi cabin lệch tầng có thể gây tai nạn nghiêm trọng.'},
 {text:'Trèo qua cửa nóc để tìm đường sang tầng gần nhất.',feedback:'Tự trèo nóc đưa hành khách vào giếng thang nguy hiểm, không phải lối tự cứu an toàn.'}]},
{id:17,deck:2,topic:'Điện & hóa chất',title:'Sạch hơn hay nguy hiểm hơn?',prompt:'Khi vệ sinh trường, một bạn định trộn Javel chứa hypochlorite với chất tẩy bồn cầu chứa axit để tăng hiệu quả. Phương án nào đúng nhất?',hint:'Từng sản phẩm dùng được riêng có chứng minh chúng có thể trộn chung không?',sources:['chemical'],correct:3,options:[
 {text:'Có thể trộn nếu pha từng chất thật loãng trước.',feedback:'Pha loãng không biến việc trộn hóa chất không tương thích thành cách dùng an toàn.'},
 {text:'Có thể trộn nếu đeo khẩu trang y tế và mở hết cửa.',feedback:'Khẩu trang y tế không bảo vệ khỏi khí độc; mở cửa không làm việc trộn an toàn.'},
 {text:'Có thể trộn ít ngoài sân rồi mang vào dùng ngay.',feedback:'Lượng nhỏ vẫn có thể sinh khí độc; đổi nơi trộn không loại trừ phản ứng nguy hiểm.'},
 {text:'Không trộn; dùng đúng nhãn vì hỗn hợp có thể giải phóng khí độc.',feedback:'Hypochlorite phản ứng nguy hiểm với axit, có thể giải phóng khí độc. Không tự phối trộn chất tẩy rửa.'}]},
{id:18,deck:2,topic:'Cứu hộ an toàn',title:'Người trước qua được, mình cũng vậy?',prompt:'Đường về bị ngập sau mưa, nước chảy ngang và không thấy nền phía dưới. Một bạn vừa đi qua được rủ em dắt xe đạp theo. Em nên chọn cách nào?',hint:'Mặt nước che nguy cơ nào mà việc nhìn người đi trước không kiểm chứng được?',sources:['flood'],correct:1,options:[
 {text:'Đi đúng vệt bánh bạn vì nền đường đã được kiểm tra.',feedback:'Nước và nền đường có thể đổi; một người qua được không chứng minh đường vẫn an toàn.'},
 {text:'Không đi vào; quay lại nơi an toàn, tìm tuyến khác hoặc nhờ hỗ trợ.',feedback:'Nước che hố, nền đường hỏng và dòng chảy nguy hiểm. Không thử vượt chỉ dựa vào người đi trước.'},
 {text:'Buộc hai xe vào nhau rồi cùng dắt cho vững.',feedback:'Buộc xe không loại trừ bị cuốn hoặc rơi vào nơi nền đường bị phá hỏng.'},
 {text:'Dò từng bước, nước chưa đến đầu gối thì đi tiếp.',feedback:'Độ cao tại một điểm không phản ánh sức dòng chảy, hố sâu hoặc nền đường phía trước.'}]},
{id:19,deck:2,topic:'Sơ cứu',title:'Đỡ ngồi dậy có thật sự giúp?',prompt:'Một bạn ngã từ trên cao, tỉnh và thở bình thường nhưng đau cổ, tê hai chân. Hiện trường an toàn, không chảy máu đe dọa tính mạng. Có người muốn kéo bạn ngồi dậy cho dễ thở. Em nên làm gì?',hint:'Đề đã loại trừ nguy hiểm hiện trường và nhu cầu di chuyển để can thiệp cứu sống ngay.',sources:['spine'],correct:2,options:[
 {text:'Đỡ ngồi từ từ rồi hỏi cảm giác tê có giảm không.',feedback:'Dựng người nghi chấn thương cột sống có thể làm tổn thương nặng; không đổi tư thế để thử triệu chứng.'},
 {text:'Cho thử đứng với hai người dìu để kiểm tra đi lại.',feedback:'Thử đứng, đi không phải cách đánh giá an toàn khi đau cổ, tê chân sau ngã.'},
 {text:'Khuyên hạn chế cử động, giữ tư thế, gọi 115 và theo dõi thở.',feedback:'Nghi chấn thương cột sống: hạn chế di chuyển, gọi cấp cứu khi hiện trường an toàn và chưa cần can thiệp cứu sống khác.'},
 {text:'Xoa bóp cổ và kéo thẳng chân trước khi đưa tới y tế.',feedback:'Xoa bóp, kéo nắn khi nghi chấn thương cột sống có thể làm nặng tổn thương.'}]},
{id:20,deck:2,topic:'Sơ cứu',title:'Khi cơ thể vẫn đang tự bảo vệ',prompt:'Một bạn hóc khi ăn nhưng vẫn ho mạnh, nói được và tự thở. Em đã học sơ cứu hóc dị vật. Hành động ban đầu nào phù hợp nhất lúc này?',hint:'Phân biệt ho hiệu quả với tình trạng không thể ho, nói hoặc thở.',sources:['choking'],correct:0,options:[
 {text:'Khuyến khích ho, theo dõi sát, sẵn sàng can thiệp nếu nặng lên.',feedback:'Ho hiệu quả có thể đẩy dị vật ra. Ở lại theo dõi; nếu không ho, nói hoặc thở được, gọi hỗ trợ và xử trí theo huấn luyện.'},
 {text:'Ép bụng nhiều lần ngay dù bạn vẫn đang ho mạnh.',feedback:'Không vội dùng thủ thuật dành cho tắc nghẽn nặng khi còn ho hiệu quả, nói được.'},
 {text:'Cho uống nhanh nước để cuốn dị vật xuống dạ dày.',feedback:'Cho uống khi đang hóc có thể gây sặc, không phải cách xử lý dị vật đường thở.'},
 {text:'Đưa ngón tay sâu vào miệng tìm và móc dị vật.',feedback:'Móc mù khi không nhìn thấy dị vật có thể đẩy sâu hơn hoặc gây tổn thương.'}]}
];
