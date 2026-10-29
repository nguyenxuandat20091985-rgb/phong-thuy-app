/*
 * Traditional Five-Element reference for common house-form concerns and stars 5, 2, 3, 4.
 * School-specific symbolic guidance only. The priority field is driven by practical safety,
 * not a claim that a star predicts harm. Physical remediation takes precedence over objects.
 */
'use strict';
const STARS={
 5:{name:'Ngũ Hoàng',element:'Thổ',traditionalPriority:'Cao trong trường phái tham khảo',principle:'Tiết Thổ bằng Kim; hóa bằng xử lý vấn đề thực tế',traditionalAction:'Một số trường phái dùng biểu tượng Kim để tiết Thổ và khuyên giữ khu vực yên tĩnh. Chỉ xem đây là quy ước biểu tượng, không phải tác dụng đã được chứng minh.',avoid:'Không tăng cường Hỏa/Thổ theo biểu tượng nếu đang theo đúng trường phái này; không dùng vật phẩm nặng, điện hoặc lửa gây nguy hiểm.',caution:'Không kết luận có tai họa chỉ vì sao 5 nằm ở một cung.'},
 2:{name:'Nhị Hắc',element:'Thổ',traditionalPriority:'Cao trong trường phái tham khảo',principle:'Tiết Thổ bằng Kim; hóa bằng vệ sinh, thông thoáng và xử lý ẩm',traditionalAction:'Nếu gia đình theo cách luận này, có thể dùng biểu tượng Kim ở mức nhẹ và giữ khu vực sạch, khô, ít bừa bộn. Ưu tiên sửa rò rỉ, nấm mốc và thông gió.',avoid:'Không thay việc xử lý ẩm mốc/y tế bằng vật phẩm; không tăng Hỏa/Thổ chỉ vì một sao.',caution:'Sao 2 không phải chẩn đoán bệnh hoặc bằng chứng gây bệnh.'},
 3:{name:'Tam Bích',element:'Mộc',traditionalPriority:'Vừa; xét theo tổ hợp và hoàn cảnh',principle:'Chế Mộc bằng Kim hoặc tiết Mộc bằng Hỏa theo trường phái',traditionalAction:'Một số cách luận dùng Kim để chế Mộc hoặc Hỏa để tiết Mộc ở mức biểu tượng. Ưu tiên giảm xung đột, tiếng ồn và các nguồn kích thích thực tế.',avoid:'Không đốt lửa, đốt giấy, dùng điện/nhiệt hay đặt vật sắc nhọn để “hóa giải”. Không gán tranh chấp cho sao.',caution:'Chỉ áp dụng luận sao khi đã xác định đúng vận nhà, sơn hướng và bàn sao.'},
 4:{name:'Tứ Lục',element:'Mộc',traditionalPriority:'Có điều kiện; không tự động hóa giải',principle:'Ưu tiên hóa theo công năng; tiết/chế chỉ khi có lý do rõ',traditionalAction:'Tứ Lục có thể được diễn giải tích cực trong học tập/văn chương ở một số trường phái. Không tự động chế Mộc; trước hết tối ưu ánh sáng, công năng và trật tự. Nếu theo một nhánh cụ thể, ghi rõ nhánh đó trước khi áp dụng tiết/chế.',avoid:'Không mặc định sao 4 là sát khí; tránh làm giảm ánh sáng, cản lối đi hoặc mua vật phẩm tốn kém theo lời hứa tài lộc.',caution:'Kết quả này không xác định tốt/xấu cho toàn bộ căn nhà.'}
};
const SHA_TYPES={
 road:{name:'Đường đâm thẳng / luồng xe',physicalPriority:'Cao nếu có nguy cơ xe thật',practicalAction:'Quan sát lưu lượng, tầm nhìn và lối xe. Nếu có nguy cơ va chạm, nhờ đơn vị thiết kế đánh giá rào chắn/điều chỉnh lối vào; không đặt vật cản gây tai nạn hoặc che lối thoát.',avoid:'Không dùng gương/vật phẩm thay cho giải pháp giao thông và an toàn.'},
 corner:{name:'Góc nhọn / cạnh công trình',physicalPriority:'Vừa; tăng lên cao nếu có nguy cơ va chạm',practicalAction:'Kiểm tra đường đi và tầm nhìn; có thể dùng màn che hoặc cây phù hợp để giảm chói/riêng tư nếu không chắn lối đi, ánh sáng hoặc thoát hiểm.',avoid:'Không lắp vật nhọn hoặc đồ nặng dễ rơi.'},
 pole:{name:'Cột điện / cây lớn',physicalPriority:'Cao nếu liên quan điện hoặc nguy cơ đổ/gãy',practicalAction:'Giữ khoảng cách an toàn; báo đơn vị điện lực hoặc đơn vị chăm sóc cây khi có dây điện, rễ phá nền hoặc nguy cơ gãy đổ. Không tự tỉa cây gần dây điện.',avoid:'Không chạm, di chuyển hoặc tự xử lý cột/dây điện.'},
 water:{name:'Sông, hồ, mương hoặc mép nước',physicalPriority:'Vừa; cao nếu có nguy cơ ngập/đuối nước',practicalAction:'Đánh giá bờ, lan can, nguy cơ ngập, muỗi và thoát nước. Nước không tự động là sát khí; xem địa hình và an toàn thực tế.',avoid:'Không lấp mương, đổi dòng hoặc chặn lối thoát nước nếu chưa được phép.'},
 shape:{name:'Hình thế đất / ranh giới bất thường',physicalPriority:'Vừa; cần chuyên gia nếu ảnh hưởng kết cấu/pháp lý',practicalAction:'Đối chiếu đo đạc, giấy tờ và mặt bằng; tối ưu công năng và lối đi. Hỏi kiến trúc sư/kỹ sư trước khi san lấp hoặc thay đổi kết cấu.',avoid:'Không tự đào, đắp hoặc cắt taluy theo suy đoán phong thủy.'},
 noise:{name:'Tiếng ồn, bụi hoặc đèn chiếu',physicalPriority:'Vừa',practicalAction:'Xử lý nguồn nếu có thể; dùng gioăng cửa, vật liệu giảm âm, rèm và che sáng phù hợp; duy trì thông gió và lối thoát.',avoid:'Không đóng kín nhà gây thiếu thông gió hoặc cản thoát hiểm.'},
 drain:{name:'Đọng nước / thoát nước kém',physicalPriority:'Cao; khẩn cấp nếu đang ngập hoặc nước gần điện',practicalAction:'Thông tắc, sửa độ dốc, chống thấm và dẫn nước đúng quy định. Nếu nước gần điện hoặc ngập nhanh, tránh khu vực và gọi đơn vị chuyên môn.',avoid:'Không che miệng cống hoặc dùng vật phẩm thay cho sửa hệ thống.'},
 crack:{name:'Nứt, nghiêng hoặc hư hỏng kết cấu',physicalPriority:'Khẩn cấp nếu vết nứt tăng, nghiêng hoặc có nguy cơ sập',practicalAction:'Ghi nhận vết nứt và gọi kỹ sư kết cấu/đơn vị có chuyên môn. Nếu có dấu hiệu nguy hiểm, ngừng sử dụng khu vực, di chuyển người ra nơi an toàn và liên hệ cơ quan khẩn cấp tại địa phương.',avoid:'Không trám che vết nứt để làm đẹp trước khi đánh giá; không dùng vật phẩm phong thủy thay cho kiểm định.'}
};
function getRemedy(shaType,star){
 const sha=SHA_TYPES[shaType],rule=STARS[star];
 if(!sha||!rule)return null;
 return {shaType,shaName:sha.name,star,starName:rule.name,starElement:rule.element,physicalPriority:sha.physicalPriority,traditionalPriority:rule.traditionalPriority,principle:rule.principle,practicalAction:sha.practicalAction,traditionalAction:rule.traditionalAction,avoid:sha.avoid+' '+rule.avoid,caution:rule.caution};
}
function getShaTypes(){return Object.entries(SHA_TYPES).map(([id,value])=>({id,...value}));}
function getStarRules(){return Object.entries(STARS).map(([id,value])=>({id:Number(id),...value})).sort((a,b)=>a.id-b.id);}
const PhongThuyHoaGiaiSatKhi=Object.freeze({getRemedy,getShaTypes,getStarRules});
if(typeof module!=='undefined'&&module.exports)module.exports=PhongThuyHoaGiaiSatKhi;
if(typeof window!=='undefined')window.PhongThuyHoaGiaiSatKhi=PhongThuyHoaGiaiSatKhi;
