package com.ktnet.mobilebiz.repo;


import com.ktnet.mobilebiz.model.Executive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExecutiveRepository extends JpaRepository<Executive, Long> {


    Executive findByExecutiveId(String ExecutiveId);
}
