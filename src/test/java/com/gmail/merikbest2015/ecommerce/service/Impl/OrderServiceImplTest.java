package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.OrderItem;
import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.repository.OrderItemRepository;
import com.gmail.merikbest2015.ecommerce.repository.OrderRepository;
import com.gmail.merikbest2015.ecommerce.repository.ProductRepository;
import com.gmail.merikbest2015.ecommerce.service.email.MailSender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OrderServiceImplTest {

    @Autowired
    private OrderServiceImpl orderService;

    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private OrderItemRepository orderItemRepository;

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private MailSender mailSender;

    @Test
    public void findAll() {
        Pageable pageable = PageRequest.of(0, 20);
        List<Order> orderList = new ArrayList<>();
        orderList.add(new Order());
        orderList.add(new Order());
        Page<Order> orders = new PageImpl<>(orderList, pageable, 20);

        when(orderRepository.findAllByOrderByIdAsc(pageable)).thenReturn(orders);
        orderService.getAllOrders(pageable);
        assertEquals(2, orderList.size());
        verify(orderRepository, times(1)).findAllByOrderByIdAsc(pageable);
    }

    @Test
    public void findOrderByEmail() {
        Pageable pageable = PageRequest.of(0, 20);
        Order order1 = new Order();
        order1.setEmail(ORDER_EMAIL);
        Order order2 = new Order();
        order2.setEmail(ORDER_EMAIL);
        List<Order> orderList = new ArrayList<>();
        orderList.add(order1);
        orderList.add(order2);
        Page<Order> orders = new PageImpl<>(orderList, pageable, 20);

        when(orderRepository.findOrderByEmail(ORDER_EMAIL, pageable)).thenReturn(orders);
        orderService.getUserOrders(ORDER_EMAIL, pageable);
        assertEquals(2, orderList.size());
        verify(orderRepository, times(1)).findOrderByEmail(ORDER_EMAIL, pageable);
    }

    @Test
    public void postOrder() {
        Map<Long, Long> productsId = new HashMap<>();
        productsId.put(1L, 1L);
        productsId.put(2L, 1L);

        Product product1 = new Product();
        product1.setId(1L);
        product1.setPrice(PRICE);
        Product product2 = new Product();
        product2.setPrice(PRICE);
        product2.setId(2L);

        OrderItem orderItem1 = new OrderItem();
        orderItem1.setProduct(product1);
        orderItem1.setAmount(192L);
        orderItem1.setQuantity(1L);
        OrderItem orderItem2 = new OrderItem();
        orderItem2.setProduct(product2);
        orderItem2.setAmount(192L);
        orderItem2.setQuantity(1L);

        Order order = new Order();
        order.setFirstName(FIRST_NAME);
        order.setLastName(LAST_NAME);
        order.setCity(CITY);
        order.setAddress(ADDRESS);
        order.setEmail(ORDER_EMAIL);
        order.setPostIndex(POST_INDEX);
        order.setPhoneNumber(PHONE_NUMBER);
        order.setTotalPrice(TOTAL_PRICE);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);

        when(productRepository.findById(1L)).thenReturn(java.util.Optional.of(product1));
        when(productRepository.findById(2L)).thenReturn(java.util.Optional.of(product2));
        when(orderItemRepository.save(orderItem1)).thenReturn(orderItem1);
        when(orderItemRepository.save(orderItem2)).thenReturn(orderItem2);
        when(orderRepository.save(order)).thenReturn(order);
        orderService.postOrder(order, productsId);
        assertNotNull(order);
        assertEquals(ORDER_EMAIL, order.getEmail());
        assertNotNull(orderItem1);
        assertNotNull(orderItem2);
        verify(mailSender, times(1))
                .sendMessageHtml(
                        ArgumentMatchers.eq(order.getEmail()),
                        ArgumentMatchers.eq("Order #" + order.getId()),
                        ArgumentMatchers.eq("order-template"),
                        ArgumentMatchers.eq(attributes));
    }
}
